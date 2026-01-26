import * as z from 'zod';

export const OpenRouterSuccessResSchema = z.looseObject({
  object: z.literal('chat.completion'),
  choices: z.array(
    z.looseObject({
      message: z.object({
        role: 'assistant',
        content: z.string(),
      }),
    }),
  ),
});

export const OpenRouterErrorResSchema = z.looseObject({
  code: z.int(),
  metadata: z.optional(z.object()),
  message: z.string(),
});
