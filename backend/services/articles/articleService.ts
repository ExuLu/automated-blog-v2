import LlmClient from '../llm/LlmClient.js';
import {
  createArticleRepo,
  saveArticleToFile,
  removeArticleAfterError,
  getAllArticlesRepo,
  getArticleByIdRepo,
} from '../../data/articleRepository.js';
import HttpError from '../../errors/ApiError.js';
import { DEFAULT_TOPIC } from '../../constants.js';

import { isDefinedString } from '../../validation/isDefinedString.js';

import type { ArticleInput, ArticleRecord } from '../../types/article.js';

let llmClient: LlmClient | null = null;

const getLlmClient = (): LlmClient => {
  if (llmClient) return llmClient;

  const apiKey = process.env.OPENROUTER_API_KEY;
  const url = process.env.OPENROUTER_URL;
  const llmModel = process.env.LLM_MODEL;

  if (
    !isDefinedString(apiKey) ||
    !isDefinedString(url) ||
    !isDefinedString(llmModel)
  ) {
    throw new Error('Please add correct environment variables');
  }

  llmClient = new LlmClient({ model: llmModel, apiKey, url });
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
    throw new HttpError(
      500,
      `Failed to save article because of: ${String(err)}`,
    );
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
