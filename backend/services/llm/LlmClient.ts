import ApiError from '../../errors/ApiError.js';
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
import { ErrorCodes } from '../../types/errors.js';

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
      console.error(`OpenRouter request failed because of: ${String(err)}`);
      throw new ApiError(ErrorCodes.llmRequestFailed);
    }
  }

  private async getResponseData(
    response: Response,
  ): Promise<OpenRouterChatCompletionResponse> {
    let data: unknown;
    try {
      data = await response.json();
    } catch (err) {
      throw new ApiError(ErrorCodes.llmRequestFailed);
    }

    if (!response.ok) {
      const errorLog = isOpenRouterErrorResponse(data)
        ? `OpenRouter request failed because of: ${String(data.error)}`
        : `OpenRouter request failed with status ${response.status}`;
      console.error(errorLog);

      throw new ApiError(ErrorCodes.llmRequestFailed);
    }

    if (!isChatCompletionResponse(data)) {
      throw new ApiError(ErrorCodes.invalidLlmResponse);
    }

    return data;
  }

  private parseData(data: OpenRouterChatCompletionResponse): ArticleInput {
    const rawContent = data.choices[0].message.content;

    if (!rawContent || rawContent.trim() === '') {
      throw new ApiError(ErrorCodes.invalidArticleFormat);
    }

    try {
      const article: unknown = JSON.parse(rawContent);

      if (!isArticleInput(article))
        throw new ApiError(ErrorCodes.invalidArticleFormat);

      return article;
    } catch (err) {
      console.error('Failed to parse article. Raw model content:', rawContent);
      throw new ApiError(ErrorCodes.articleParseFailed);
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
