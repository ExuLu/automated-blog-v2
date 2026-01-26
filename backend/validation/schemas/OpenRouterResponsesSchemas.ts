import * as z from 'zod';

export const OpenRouterSuccessResSchema = z.looseObject({
  object: z.literal('chat.completion'),
  id: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z
    .array(
      z.looseObject({
        index: z.number(),
        finish_reason: z.string().nullable(),
        message: z.object({
          role: z.literal('assistant'),
          content: z.string().nullable(),
        }),
      }),
    )
    .min(1),
});

export const OpenRouterErrorResSchema = z.object({
  error: z.looseObject({
    code: z.int(),
    message: z.string(),
  }),
});
