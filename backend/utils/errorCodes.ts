import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';
import { ErrorsMap } from '../types/errors.js';

const errors: ErrorsMap = {
  articleNotFound: {
    code: 'ARTICLE_NOT_FOUND',
    statusCode: 404,
    message: 'Article is not found',
  },
  pageNotFound: {
    code: 'PAGE_NOT_FOUND',
    statusCode: 404,
    message: 'Api route not found',
  },
  articleGenerationFailed: {
    code: 'ARTICLE_GENERATION_FAILED',
    statusCode: 500,
    message: 'Failed to generate article',
  },
  invalidArticleBody: {
    code: 'ARTICLE_VALIDATION_FAILED',
    statusCode: 400,
    message: 'The article should contain title and content',
  },
  invalidArticleTitle: {
    code: 'ARTICLE_TITLE_VALIDATION_FAILED',
    statusCode: 400,
    message: `Article title should contain from 1 to ${TITLE_MAX_LENGTH} characters`,
  },
  invalidArticleContent: {
    code: 'ARTICLE_CONTENT_VALIDATION_FAILED',
    statusCode: 400,
    message: `Article content should contain from 1 to ${CONTENT_MAX_LENGTH} characters`,
  },
  invalidArticleId: {
    code: 'ARTICLE_ID_VALIDATION_FAILED',
    statusCode: 400,
    message: 'Article id is not valid',
  },
  invalidArticleTopic: {
    code: 'ARTICLE_TOPIC_VALIDATION_FAILED',
    statusCode: 400,
    message: 'Please provide topic to generate an article',
  },
};
