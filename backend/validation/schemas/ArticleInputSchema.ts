import * as z from 'zod';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../../constants.js';

export const ArticleInputSchema = z.object({
  title: z.string().trim().min(1).max(TITLE_MAX_LENGTH),
  content: z.string().trim().min(1).max(CONTENT_MAX_LENGTH),
});
