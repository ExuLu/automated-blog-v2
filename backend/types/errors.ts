type AppError = {
  statusCode: number;
  message: string;
};

export type ErrorsMap = Record<ErrorCodes, AppError>;

export enum ErrorCodes {
  articleNotFound = 'ARTICLE_NOT_FOUND',
  routeNotFound = 'ROUTE_NOT_FOUND',
  articleCreationFailed = 'ARTICLE_CREATION_FAILED',
  articleSaveFailed = 'ARTICLE_SAVE_FAILED',
  llmRequestFailed = 'LLM_REQUEST_FAILED',
  invalidLlmResponse = 'INVALID_LLM_RESPONSE',
  invalidArticleFormat = 'INVALID_ARTICLE_FORMAT',
  articleParseFailed = 'ARTICLE_PARSE_FAILED',
  articleGenerationFailed = 'ARTICLE_GENERATION_FAILED',
  articleValidationFailed = 'ARTICLE_VALIDATION_FAILED',
  articleTitleValidationFailed = 'ARTICLE_TITLE_VALIDATION_FAILED',
  articleContentValidationFailed = 'ARTICLE_CONTENT_VALIDATION_FAILED',
  articleIdValidationFailed = 'ARTICLE_ID_VALIDATION_FAILED',
  articleTopicValidationFailed = 'ARTICLE_TOPIC_VALIDATION_FAILED',
  internalError = 'INTERNAL_ERROR',
}
