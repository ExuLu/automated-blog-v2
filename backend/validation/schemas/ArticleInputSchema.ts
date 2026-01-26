import * as z from 'zod';

export const ArticleInputSchema = z.object({
  title: z.string(),
  content: z.string(),
});
