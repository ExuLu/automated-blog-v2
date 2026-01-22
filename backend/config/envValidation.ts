import { isDefinedString } from '../validation/isDefinedString.js';

export function envValidation(): {
  frontendOrigin: string;
  llmConfigs: { apiKey: string; apiUrl: string; llmModel: string };
} {
  const frontendOrigin = process.env.FRONTEND_ORIGIN;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = process.env.OPENROUTER_URL;
  const llmModel = process.env.LLM_MODEL;

  if (!isDefinedString(frontendOrigin))
    throw Error('Please provide FRONTEND_ORIGIN to setup cors');

  if (
    !isDefinedString(apiKey) ||
    !isDefinedString(apiUrl) ||
    !isDefinedString(llmModel)
  )
    throw Error(
      'Please provide api key, url and llm model to make request to OpenRouter API',
    );

  return { frontendOrigin, llmConfigs: { apiKey, apiUrl, llmModel } };
}
