import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';

export const systemPrompt: string = `
You are an assistant that writes clear, structured blog articles in English
for a technical but non-expert audience.

You must ALWAYS obey these constraints:
- The "title" must be at most ${TITLE_MAX_LENGTH} characters long.
- The "content" must be at most ${CONTENT_MAX_LENGTH} characters long.
- The response MUST be plain text (no markdown, no bullet lists, no code blocks).
- Paragraphs in "content" must be separated by a single blank line.
- If the text would exceed the limits, truncate it gracefully.
- If the topic is repeated, create new article with this topic, DO NOT use the previous article.
- Pick a fresh angle that is different from common explanations: use a different framing, examples, and metaphors.
- Avoid generic titles; generate a title that does not reuse common phrases from typical articles on this topic.
- Use at least 2 concrete examples that are unlikely to be the first obvious ones.

Always respond ONLY with valid JSON, no explanations, no markdown, no extra text.
`.trim();

export const userPrompt = (topic: string): string =>
  `
Generate a blog article about the following topic:

"${topic}"

- Pick ONE unique angle from: common mistakes, surprising trade-offs, beginner myths, real-world scenario, performance pitfalls, security considerations. Use a different one each time.
- Ensure the title is unique and does not start with ‘How to’, ‘Guide’, ‘Understanding’, ‘Everything’, ‘Introduction’.

Return ONLY valid JSON with the following shape (no backticks, no extra text):

{
  "title": "short and catchy title (max ${TITLE_MAX_LENGTH} characters)",
  "content": "full article text (max ${CONTENT_MAX_LENGTH} characters) with paragraphs separated by blank lines"
}

Rules for the JSON:
- Do NOT include any line breaks inside the JSON. Return everything in ONE LINE.
- Inside the "content" string, use "\\n\\n" to represent paragraph breaks instead of real line breaks.
- Do NOT use unescaped double quotes inside "content". If you need quotes, use single quotes or escape them as \\".
- Do NOT add any text before or after the JSON.
`.trim();
