import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';
import { ErrorsMap } from '../types/errors.js';

export const errorCodes: ErrorsMap = {
  ARTICLE_NOT_FOUND: {
    statusCode: 404,
    message: 'Article is not found',
  },
  ROUTE_NOT_FOUND: {
    statusCode: 404,
    message: 'Api route not found',
  },
  ARTICLE_GENERATION_FAILED: {
    statusCode: 500,
    message: 'Failed to generate article',
  },
  ARTICLE_VALIDATION_FAILED: {
    statusCode: 400,
    message: 'The article should contain title and content',
  },
  ARTICLE_TITLE_VALIDATION_FAILED: {
    statusCode: 400,
    message: `Article title should contain from 1 to ${TITLE_MAX_LENGTH} characters`,
  },
  ARTICLE_CONTENT_VALIDATION_FAILED: {
    statusCode: 400,
    message: `Article content should contain from 1 to ${CONTENT_MAX_LENGTH} characters`,
  },
  ARTICLE_ID_VALIDATION_FAILED: {
    statusCode: 400,
    message: 'Article id is not valid',
  },
  ARTICLE_TOPIC_VALIDATION_FAILED: {
    statusCode: 400,
    message: 'Please provide topic to generate an article',
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    message: 'Something went wrong. Please try again later',
  },
};
