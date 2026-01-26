import { EnvVariableSchema } from './schemas/envVarSchema.js';

export const isDefinedString = (
  envVariable: string | undefined,
): envVariable is string => {
  return EnvVariableSchema.parse(envVariable);
};
