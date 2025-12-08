const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'data', 'articles.json');

let articles = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

async function saveArticlesToFile(articles) {
  const json = JSON.stringify(articles, null, 2);

  return await fsPromises.writeFile(FILE_PATH, json, 'utf-8');
}

exports.getAllArticles = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};

exports.getArticleById = (req, res) => {
  const article = articles.find((art) => art.id === req.params.id);

  if (!article) {
    res.status(401).json({
      status: 'fail',
      message: 'Article is not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
};

exports.createArticle = (req, res) => {
  if (!req.body?.title || !req.body?.content) {
    return res.status(400).json({
      status: 'fail',
      message: 'The article should contain title and content',
    });
  }

  const newArticle = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  articles.push(newArticle);

  saveArticlesToFile(articles)
    .then(() => {
      res.status(201).json({
        status: 'success',
        data: {
          article: newArticle,
        },
      });
    })
    .catch((err) => {
      articles.pop();

      res.status(500).json({
        status: 'error',
        message: 'There was an error while saving an article. Please try again',
      });
    });
};
