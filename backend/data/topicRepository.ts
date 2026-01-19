import fs from 'fs';
import path from 'path';

let topics: string[] = [];
const FILE_PATH = path.join(__dirname, 'topics.json');

export const DEFAULT_TOPIC: string = 'AI role in modern technologies';

const isStringArray = (parsedData: unknown): parsedData is string[] =>
  Array.isArray(parsedData) && parsedData.every((el) => typeof el === 'string');

try {
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  const parsed: unknown = JSON.parse(raw);

  if (isStringArray(parsed)) {
    topics = parsed;
  } else {
    console.error(
      'topics.json contains wrong topics type. Using empty topics list.'
    );
    topics = [];
  }
} catch (err) {
  const error = err as NodeJS.ErrnoException;
  if (error.code === 'ENOENT') {
    console.log('topics.json not found. Creating an empty file...');
    fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
    topics = [];
  } else {
    console.error('Error reading topics.json:', err);
    topics = [];
  }
}

export function getRandomTopic(): string {
  if (!topics.length) {
    return DEFAULT_TOPIC;
  }

  const index: number = Math.floor(Math.random() * topics.length);
  return topics[index];
}
