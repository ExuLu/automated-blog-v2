const cron = require('node-cron');
const createAndGenerate = require('./articleService');

function startArticleScheduler() {
  if (process.env.ENABLE_DAILY_GENERATION !== 'true') {
    console.log(
      'Article scheduler is disabled (set ENABLE_DAILY_GENERATION=true to enable)'
    );
    return;
  }

  const schedule = process.env.ARTICLE_CRON || '0 9 * * *';

  cron.schedule(schedule, async () => {
    console.log('Starting scheduled article generation...');

    try {
      await createAndGenerate();
      console.log('Scheduled article generated successfully');
    } catch (err) {
      console.error('Scheduled article generation failed:', err);
    }
  });

  console.log(`Article scheduler started with cron: "${schedule}"`);
}

module.exports = { startArticleScheduler };
