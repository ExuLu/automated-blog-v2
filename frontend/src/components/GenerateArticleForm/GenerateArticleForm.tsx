import { useState } from 'react';

import ErrorComponent from '../Error/Error';
import { generateAndAddArticle } from '../../api/articlesApi';

import styles from './GenerateArticleForm.module.css';
import type { AppError } from '../../types/error';

type GenerateArticleFormProps = { submitAction: () => Promise<void> };

export default function GenerateArticleForm({
  submitAction,
}: GenerateArticleFormProps) {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppError>(null);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await generateAndAddArticle(topic);
      submitAction();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate article'
      );
    } finally {
      setIsLoading(false);
    }

    setTopic('');
  };

  return (
    <>
      {error && <ErrorComponent isMainPage={true} message={error} />}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>Generate new article</span>
          <input
            className={styles.input}
            type='text'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder='Enter topic for the next article'
            disabled={isLoading}
          />
        </label>

        <button
          type='submit'
          className={styles.button}
          disabled={isLoading || !topic.trim()}
        >
          {isLoading ? 'Generating…' : 'Generate'}
        </button>
      </form>
    </>
  );
}
