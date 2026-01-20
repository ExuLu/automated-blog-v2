import HttpError from '../errors/HttpError.js';
import { isOpenRouterError } from '../errors/normalizeError.js';
import { ArticleInput } from '../types/article.js';
import {
  OpenRouterChatCompletionResponse,
  PromptBody,
} from '../types/llm.js';
import { systemPrompt, userPrompt } from './prompts.js';

const MODEL = process.env.LLM_MODEL;
const API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL;

const isUndefined = (envVariable: unknown): envVariable is undefined =>
  envVariable === undefined;

function isChatCompletionResponse(
  data: unknown,
): data is OpenRouterChatCompletionResponse {
  if (!data || typeof data !== 'object') return false;

  const obj = data as Partial<OpenRouterChatCompletionResponse>;
  if (obj.object !== 'chat.completion' || !Array.isArray(obj.choices)) {
    return false;
  }

  return obj.choices.every((choice) => {
    if (!choice || typeof choice !== 'object') return false;

    const message = (choice as any).message;
    return (
      message &&
      typeof message === 'object' &&
      (message.content === null || typeof message.content === 'string') &&
      message.role === 'assistant'
    );
  });
}

export default async function generateArticle(
  topic: string,
): Promise<ArticleInput> {
  if (
    isUndefined(MODEL) ||
    isUndefined(API_KEY) ||
    isUndefined(OPENROUTER_URL)
  ) {
    throw new Error('Please set your environment variables correctly');
  }

  const body: PromptBody = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: userPrompt(topic),
      },
    ],
    response_format: { type: 'json_object' },
  };

  const response: Response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    const message = isOpenRouterError(data)
      ? data.error.message
      : `OpenRouter request failed with status ${response.status}`;

    throw new HttpError(response.status, message);
  }

  if (!isChatCompletionResponse(data)) {
    throw new Error('Unexpected OpenRouter response format');
  }

  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('LLM returned empty content');
  }

  try {
    const article = JSON.parse(rawContent);
    return article;
  } catch (err) {
    console.log('Raw model content:', rawContent);
    throw new Error('Failed to parse article JSON from LLM');
  }
}
