import {
  OpenRouterChatCompletionResponse,
  OpenRouterErrorResponse,
} from '../types/llm.js';

export function isChatCompletionResponse(
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

export const isOpenRouterErrorResponse = (
  err: unknown,
): err is OpenRouterErrorResponse => {
  if (!err || typeof err !== 'object') return false;

  const error = (err as any).error;
  const hasValidCode =
    typeof error?.code === 'number' && Number.isFinite(error.code);
  const hasValidMetadata =
    error?.metadata === undefined ||
    (typeof error.metadata === 'object' && error.metadata !== null);

  return (
    error &&
    typeof error === 'object' &&
    hasValidCode &&
    typeof error.message === 'string' &&
    hasValidMetadata
  );
};
