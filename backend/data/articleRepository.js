const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fsPromises = fs.promises;

let articles = [];
const FILE_PATH = process.env.ARTICLES_PATH;

try {
  articles = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('articles.json not found. Creating an empty file...');
    fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
    articles = [];
  } else {
    console.error('Error reading articles.json:', err);
    articles = [];
  }
}

exports.getAllArticles = function () {
  return articles;
};

exports.getArticleById = function (id) {
  return articles.find((article) => article.id === id) ?? null;
};

exports.createArticle = function (articleData) {
  const newArticle = {
    ...articleData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  articles.push(newArticle);

  return newArticle;
};

exports.saveArticleToFile = async function () {
  const json = JSON.stringify(articles, null, 2);

  return await fsPromises.writeFile(FILE_PATH, json, 'utf-8');
};

exports.removeArticleAfterError = function () {
  articles.pop();
};
