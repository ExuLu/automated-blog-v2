import {
  OpenRouterErrorResSchema,
  OpenRouterSuccessResSchema,
} from './schemas/OpenRouterResponsesSchemas.js';

import type {
  OpenRouterChatCompletionResponse,
  OpenRouterErrorResponse,
} from '../types/llm.js';

export const isChatCompletionResponse = (
  data: unknown,
): data is OpenRouterChatCompletionResponse =>
  OpenRouterSuccessResSchema.safeParse(data).success;

export const isOpenRouterErrorResponse = (
  err: unknown,
): err is OpenRouterErrorResponse =>
  OpenRouterErrorResSchema.safeParse(err).success;
