import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { envValidation } from './envValidation.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidateRoot = path.resolve(__dirname, '..');
const projectRoot =
  path.basename(candidateRoot) === 'dist'
    ? path.resolve(candidateRoot, '..')
    : candidateRoot;

dotenv.config({
  path: path.join(projectRoot, '.env'),
});

export const { frontendOrigin, llmConfigs } = envValidation();
