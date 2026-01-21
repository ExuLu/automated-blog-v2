import LlmClient from './llm/llmClient.js';
import {
  createArticleRepo,
  saveArticleToFile,
  removeArticleAfterError,
} from '../data/articleRepository.js';
import { ArticleInput, ArticleRecord } from '../types/article.js';
import HttpError from '../errors/HttpError.js';
import { DEFAULT_TOPIC } from '../constants.js';
import { isDefinedString } from '../validation/isDefinedString.js';

// export default async function createAndGenerate(
//   topic?: string,
// ): Promise<ArticleRecord> {
//   const apiKey = process.env.OPENROUTER_API_KEY;
//   const url = process.env.OPENROUTER_URL;
//   const llmModel = process.env.LLM_MODEL;

//   if (
//     !isDefinedString(apiKey) ||
//     !isDefinedString(url) ||
//     !isDefinedString(llmModel)
//   )
//     throw new Error('Please add correct environment variables');

//   const llmClient = new LlmClient({ model: llmModel, apiKey, url });
//   const generatedData: ArticleInput = await llmClient.generateArticle(
//     topic || DEFAULT_TOPIC,
//   );

//   const generatedArticle: ArticleRecord = createArticleRepo(generatedData);

//   try {
//     await saveArticleToFile();
//   } catch (err) {
//     removeArticleAfterError();

//     console.error('Failed to save generated article:', err);
//     throw new HttpError(500, 'Failed to save generated article');
//   }

//   return generatedArticle;
// }

