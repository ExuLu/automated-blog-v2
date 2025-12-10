const { validate: uuidValidate } = require('uuid');

const TITLE_MAX_LENGTH = Number(process.env.TITLE_MAX_LENGTH) || 200;
const CONTENT_MAX_LENGTH = Number(process.env.CONTENT_MAX_LENGTH) || 20000;

exports.validateArticle = (req, res, next) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({
      status: 'fail',
      message: 'The article should contain title and content',
    });
  }

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Title and content must be strings',
    });
  }

  const titleTrimmed = title.trim();
  const contentTrimmed = content.trim();

  if (titleTrimmed.length < 1 || titleTrimmed.length > TITLE_MAX_LENGTH) {
    return res.status(400).json({
      status: 'fail',
      message: `Article title should contain from 1 to ${TITLE_MAX_LENGTH} characters`,
    });
  }

  if (contentTrimmed.length < 1 || contentTrimmed.length > CONTENT_MAX_LENGTH) {
    return res.status(400).json({
      status: 'fail',
      message: `Article content should contain from 1 to ${CONTENT_MAX_LENGTH} characters`,
    });
  }

  req.body.title = titleTrimmed;
  req.body.content = contentTrimmed;

  next();
};

exports.validateArticleId = (req, res, next) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Article id is not valid',
    });
  }

  next();
};

exports.validateArticleTopic = (req, res, next) => {
  const topic = req.body?.topic;

  if (!topic) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide topic to generate an article',
    });
  }

  if (typeof topic !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Topic must be string',
    });
  }

  if (topic.trim().length < 1) {
    return res.status(400).json({
      status: 'fail',
      message: 'Topic should not be empty',
    });
  }

  req.body.topic = topic.trim();

  next();
};
