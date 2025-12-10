const express = require('express');
const articleController = require('../controllers/articleController');
const articleValidators = require('../validation/articleValidators');

const router = express.Router();

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleValidators.validateArticle, articleController.createArticle);
router
  .route('/:id')
  .get(articleValidators.validateArticleId, articleController.getArticleById);
router
  .route('/generate')
  .post(
    articleValidators.validateArticleTopic,
    articleController.generateAndCreateArticle
  );
module.exports = router;
