const articleRepository = require('../data/articleRepository');
const { createAndGenerate } = require('../services/articleService');

exports.getAllArticles = (req, res) => {
  const articles = articleRepository.getAllArticles();

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};

exports.getArticleById = (req, res) => {
  const article = articleRepository.getArticleById(req.params.id);

  if (!article) {
    return res.status(404).json({
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

exports.createArticle = async (req, res) => {
  const newArticle = articleRepository.createArticle({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await articleRepository.saveArticleToFile();

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    articleRepository.removeArticleAfterError();

    res.status(500).json({
      status: 'error',
      message: 'There was an error while saving an article. Please try again',
    });
  }
};

exports.generateAndCreateArticle = async (req, res) => {
  const topic = req.body.topic;

  try {
    const newArticle = await createAndGenerate(topic);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    console.error('Generation failed: ', err);

    const statusCode =
      err.status && Number.isInteger(err.status) ? err.status : 500;

    res.status(statusCode).json({
      status: 'error',
      message:
        err.message ||
        'Failed to generate and save article. Please try again later',
    });
  }
};
