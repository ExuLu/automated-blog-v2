import * as z from 'zod';

export const EnvVariableSchema = z.string().trim().pipe(z.stringbool());
