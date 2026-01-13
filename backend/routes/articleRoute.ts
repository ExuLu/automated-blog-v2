import express from 'express';
import articleController from '../controllers/articleController.js';
import {
  validateArticle,
  validateArticleTopic,
  validateArticleId,
} from '../validation/articleValidators.js';

import type { Router } from 'express';

const router: Router = express.Router();

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(validateArticle, articleController.createArticle);
router.route('/:id').get(validateArticleId, articleController.getArticleById);
router
  .route('/generate')
  .post(validateArticleTopic, articleController.generateAndCreateArticle);

export default router;
