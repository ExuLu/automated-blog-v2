import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { ArticleInput, ArticleRecord } from '../types/article.js';

const fsPromises = fs.promises;

let articles: ArticleRecord[] = [];
const FILE_PATH =
  process.env.ARTICLES_PATH ?? path.join(__dirname, 'articles.json');

try {
  articles = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
} catch (err) {
  const error = err as NodeJS.ErrnoException;
  if (error.code === 'ENOENT') {
    console.log('articles.json not found. Creating an empty file...');
    fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
    articles = [];
  } else {
    console.error('Error reading articles.json:', err);
    articles = [];
  }
}

export const getAllArticlesRepo = function (): ArticleRecord[] {
  return articles;
};

export const getArticleByIdRepo = function (id: string): ArticleRecord | null {
  return articles.find((article) => article.id === id) ?? null;
};

export const createArticleRepo = function (
  articleData: ArticleInput
): ArticleRecord {
  const newArticle = {
    ...articleData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  articles.push(newArticle);

  return newArticle;
};

export const saveArticleToFile = async function (): Promise<void> {
  const json = JSON.stringify(articles, null, 2);

  await fsPromises.writeFile(FILE_PATH, json, 'utf-8');
};

export const removeArticleAfterError = function (): void {
  articles.pop();
};
