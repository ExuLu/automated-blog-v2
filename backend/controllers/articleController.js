const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'data', 'articles.json');

let { articles } = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

exports.getAllArticles = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        articles,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
    });
  }
};

exports.getArticleById = (req, res) => {
  const article = articles.find((art) => art.id === req.params.id);

  if (!article) {
    res.status(401).json({
      status: 'fail',
      message: 'Article is not found',
    });
  }

  try {
    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
    });
  }
};

exports.createArticle = (req, res) => {
  try {
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

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
    });
  }
};
