import LlmClient from '../llm/LlmClient.js';
import {
  createArticleRepo,
  saveArticleToFile,
  removeArticleAfterError,
  getAllArticlesRepo,
  getArticleByIdRepo,
} from '../../data/articleRepository.js';
import ApiError from '../../errors/ApiError.js';
import { DEFAULT_TOPIC } from '../../constants.js';

import type { ArticleInput, ArticleRecord } from '../../types/article.js';
import { ErrorCodes } from '../../types/errors.js';
import { llmConfigs } from '../../config/index.js';

let llmClient: LlmClient | null = null;

const getLlmClient = (): LlmClient => {
  if (llmClient) return llmClient;

  llmClient = new LlmClient(llmConfigs);
  return llmClient;
};

export function listArticles(): ArticleRecord[] {
  const articles = getAllArticlesRepo();
  return articles;
}

export function getArticle(articleId: string): ArticleRecord | null {
  const article = getArticleByIdRepo(articleId);
  return article;
}

export async function createNewArticle(
  article: ArticleInput,
): Promise<ArticleRecord> {
  const newArticle = createArticleRepo(article);

  try {
    await saveArticleToFile();
  } catch (err) {
    removeArticleAfterError();
    throw new ApiError(ErrorCodes.articleSaveFailed);
  }

  return newArticle;
}

export async function generateNewArticle(
  topic?: string,
): Promise<ArticleRecord> {
  const generatedData: ArticleInput = await getLlmClient().generateArticle(
    topic || DEFAULT_TOPIC,
  );

  const newArticle = await createNewArticle({
    title: generatedData.title,
    content: generatedData.content,
  });
  return newArticle;
}
