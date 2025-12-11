const generateArticle = require('./articleGenerator');
const articleRepository = require('../data/articleRepository');

const DEFAULT_TOPIC = 'AI role in modern technologies';

async function createAndGenerate(topic) {
  const generatedArticle = await generateArticle(topic || DEFAULT_TOPIC);

  articleRepository.createArticle(generatedArticle);
  try {
    await articleRepository.saveArticleToFile();
  } catch (err) {
    articleRepository.removeArticleAfterError();

    console.error('Failed to save generated article:', err);
    throw new Error('Failed to save generated article');
  }

  return generatedArticle;
}

module.exports = createAndGenerate;
