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
  usage?: ResponseUsage;
};

export type OpenRouterChatCompletionChunk = {
  id: string;
  choices: ChatCompletionChunkChoice[];
  created: number;
  model: string;
  object: 'chat.completion.chunk';
  system_fingerprint?: string;
  usage?: ResponseUsage;
};

export type OpenRouterResponse =
  | OpenRouterChatCompletionResponse
  | OpenRouterChatCompletionChunk;

// Subtypes:
export type ChatCompletionChoice = {
  index: number;
  finish_reason: string | null;
  message: {
    role: 'assistant';
    content: string | null;
    refusal?: string | null;
    tool_calls?: ToolCall[];
  };
  logprobs?: unknown;
};

export type ChatCompletionChunkChoice = {
  index: number;
  finish_reason: string | null;
  delta: {
    role?: 'assistant' | 'tool';
    content?: string | null;
    tool_calls?: ToolCall[];
  };
  logprobs?: unknown;
};

export type ToolCall = {
  id: string;
  type: 'function';
  function: FunctionCall;
};

export type FunctionCall = {
  name: string;
  arguments: string;
};

export type ResponseUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
