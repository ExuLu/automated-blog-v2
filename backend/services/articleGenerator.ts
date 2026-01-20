import HttpError from '../errors/HttpError.js';
import { isOpenRouterError } from '../errors/normalizeError.js';
import { ArticleInput } from '../types/article.js';
import { OpenRouterChatCompletionResponse, PromptBody } from '../types/llm.js';
import { systemPrompt, userPrompt } from './prompts.js';

const MODEL = process.env.LLM_MODEL;
const API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL;

const isDefinedString = (
  envVariable: string | undefined,
): envVariable is string => {
  return envVariable !== undefined && !!envVariable.trim();
};

function isChatCompletionResponse(
  data: unknown,
): data is OpenRouterChatCompletionResponse {
  if (!data || typeof data !== 'object') return false;

  const obj = data as Partial<OpenRouterChatCompletionResponse>;
  if (obj.object !== 'chat.completion' || !Array.isArray(obj.choices)) {
    return false;
  }

  const message = obj.choices[0]?.message;
  return (
    !!message &&
    typeof message === 'object' &&
    typeof message.content === 'string' &&
    message.role === 'assistant'
  );
}

const isArticleInput = (article: unknown): article is ArticleInput => {
  if (!article || typeof article !== 'object') return false;
  const partialArticleInput = article as Partial<ArticleInput>;

  return (
    typeof partialArticleInput.title === 'string' &&
    typeof partialArticleInput.content === 'string' &&
    !!partialArticleInput.content.trim() &&
    !!partialArticleInput.title.trim()
  );
};

export default async function generateArticle(
  topic: string,
): Promise<ArticleInput> {
  if (
    !isDefinedString(MODEL) ||
    !isDefinedString(API_KEY) ||
    !isDefinedString(OPENROUTER_URL)
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
