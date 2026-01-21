import express from 'express';
import {
  getAllArticles,
  createArticle,
  getArticleById,
  generateArticleWithTopic,
} from '../controllers/articleController.js';
import {
  validateArticle,
  validateArticleTopic,
  validateArticleId,
} from '../validation/articleValidators.js';

import type { Router } from 'express';

const router: Router = express.Router();

router.route('/').get(getAllArticles).post(validateArticle, createArticle);
router.route('/:id').get(validateArticleId, getArticleById);
router.route('/generate').post(validateArticleTopic, generateArticleWithTopic);

export default router;
