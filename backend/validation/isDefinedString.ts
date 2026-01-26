import { EnvVariableSchema } from './schemas/EnvVariableSchema.js';

export const isDefinedString = (
  envVariable: string | undefined,
): envVariable is string => {
  return EnvVariableSchema.safeParse(envVariable).success;
};
