const { systemPrompt, userPrompt } = require('./prompts');

const MODEL = process.env.LLM_MODEL;
const API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = process.env.OPENROUTER_URL;

if (!API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}
if (!MODEL) {
  throw new Error('LLM_MODEL is not set');
}
if (!OPENROUTER_URL) {
  throw new Error('OPENROUTER_URL is not set');
}

function parseJsonFromModel(rawContent) {
  if (!rawContent) {
    throw new Error('Empty content from LLM');
  }

  let text = Array.isArray(rawContent)
    ? rawContent.map((part) => part?.text ?? '').join('')
    : String(rawContent);

  text = text.trim();

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    console.log('Model content without valid JSON braces:', text);
    throw new Error('Model did not return JSON-like content');
  }

  const jsonText = text.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonText);
  } catch (err) {
    console.log('Raw model content:', jsonText);
    throw new Error('Failed to parse article JSON from LLM');
  }
}

async function generateArticle(topic) {
  const body = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: userPrompt(topic),
      },
    ],
  };

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.error?.message ||
      `OpenRouter request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('LLM returned empty content');
  }

  const article = parseJsonFromModel(rawContent);
  return article;
}

module.exports = generateArticle;
