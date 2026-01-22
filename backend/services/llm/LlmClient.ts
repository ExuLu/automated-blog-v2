import HttpError from '../../errors/ApiError.js';
import { systemPrompt, userPrompt } from './prompts.js';

import { isArticleInput } from '../../validation/articleGuards.js';
import {
  isChatCompletionResponse,
  isOpenRouterErrorResponse,
} from '../../validation/openRouterResponses.js';

import type { ArticleInput } from '../../types/article.js';
import type {
  OpenRouterChatCompletionResponse,
  PromptBody,
} from '../../types/llm.js';

export default class LlmClient {
  readonly model: string;
  readonly apiKey: string;
  readonly url: string;

  constructor(llmConfig: { model: string; apiKey: string; url: string }) {
    this.model = llmConfig.model;
    this.apiKey = llmConfig.apiKey;
    this.url = llmConfig.url;
  }

  private getPromptBody(topic: string): PromptBody {
    return {
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: userPrompt(topic),
        },
      ],
      response_format: { type: 'json_object' },
    };
  }

  private async request(body: PromptBody): Promise<Response> {
    try {
      const response: Response = await fetch(this.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (err) {
      throw new HttpError(502, `LLM fetch failed because of: ${String(err)}`);
    }
  }

  private async getResponseData(
    response: Response,
  ): Promise<OpenRouterChatCompletionResponse> {
    const data: unknown = await response.json();

    if (!response.ok) {
      const message = isOpenRouterErrorResponse(data)
        ? data.error.message
        : `OpenRouter request failed with status ${response.status}`;

      throw new HttpError(response.status, message);
    }

    if (!isChatCompletionResponse(data)) {
      throw new Error('Unexpected OpenRouter response format');
    }

    return data;
  }

  private parseData(data: OpenRouterChatCompletionResponse): ArticleInput {
    const rawContent = data.choices[0].message.content;

    if (!rawContent || rawContent.trim() === '') {
      throw new Error('LLM returned empty content');
    }

    try {
      const article: unknown = JSON.parse(rawContent);

      if (!isArticleInput(article))
        throw new Error('LLM returned wrong article format');

      return article;
    } catch (err) {
      console.log('Raw model content:', rawContent);
      throw new Error('Failed to parse article JSON from LLM');
    }
  }

  async generateArticle(topic: string): Promise<ArticleInput> {
    const promptBody = this.getPromptBody(topic);
    const response = await this.request(promptBody);
    const responseData = await this.getResponseData(response);
    const article = this.parseData(responseData);

    return article;
  }
}
