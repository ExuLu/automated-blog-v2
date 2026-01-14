import generateArticle from './articleGenerator.js';
import {
  createArticleRepo,
  saveArticleToFile,
  removeArticleAfterError,
} from '../data/articleRepository.js';
import { DEFAULT_TOPIC } from '../data/topicRepository.js';
import { ArticleInput, ArticleRecord } from '../types/article.js';
import HttpError from '../errors/HttpError.js';

export default async function createAndGenerate(
  topic?: string
): Promise<ArticleRecord> {
  const generatedData: ArticleInput = await generateArticle(
    topic || DEFAULT_TOPIC
  );

  const generatedArticle: ArticleRecord = createArticleRepo(generatedData);

  try {
    await saveArticleToFile();
  } catch (err) {
    removeArticleAfterError();

    console.error('Failed to save generated article:', err);
    throw new HttpError(500, 'Failed to save generated article');
  }

  return generatedArticle;
}
