export type LlmConfig = {
  apiKey: string;
  apiUrl: string;
  llmModel: string;
};

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};

export type ResponseFormat =
  | { type: 'text' }
  | { type: 'json_object' }
  | { type: 'json_schema'; schema: Record<string, unknown> };

export type PromptBody = {
  model: string;
  messages: ChatMessage[];
  response_format?: ResponseFormat;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
};

export type OpenRouterErrorResponse = {
  error: {
    code: number;
    message: string;
    metadata?: Record<string, unknown>;
  };
};

export type OpenRouterChatCompletionResponse = {
  id: string;
  choices: ChatCompletionChoice[];
  created: number;
  model: string;
  object: 'chat.completion';
  system_fingerprint?: string;
};

export type ChatCompletionChoice = {
  index: number;
  finish_reason: string | null;
  message: {
    role: 'assistant';
    content: string | null;
  };
};
