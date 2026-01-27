import { z } from 'zod';

export const TopicSchema = z
  .string()
  .trim()
  .min(3, 'Topic must be at least 3 characters')
  .max(100, 'Topic must be 100 characters or less')
  .regex(/[A-Za-z0-9]/, 'Topic must include letters or numbers');
