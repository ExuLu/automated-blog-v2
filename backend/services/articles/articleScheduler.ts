import nodeCron from 'node-cron';
import { generateNewArticle } from './articleService.js';
import { getRandomTopic } from '../../data/topicRepository.js';

export default function startArticleScheduler(): void {
  const schedulerIsEnabled =
    process.env.ENABLE_DAILY_GENERATION?.toLowerCase() === 'true';
  const schedule = process.env.ARTICLE_CRON ?? '0 9 * * *';

  if (!nodeCron.validate(schedule))
    throw new Error(`Invalid cron: ${schedule}`);

  if (!schedulerIsEnabled) {
    console.log(
      'Article scheduler is disabled (set ENABLE_DAILY_GENERATION=true to enable)',
    );
    return;
  }

  nodeCron.schedule(schedule, async () => {
    const topic = getRandomTopic();
    console.log(`Starting scheduled article generation for topic: "${topic}"`);

    try {
      await generateNewArticle(topic);
      console.log('Scheduled article generated successfully');
    } catch (err) {
      console.error('Scheduled article generation failed:', err);
    }
  });

  console.log(`Article scheduler started with cron: "${schedule}"`);
}
