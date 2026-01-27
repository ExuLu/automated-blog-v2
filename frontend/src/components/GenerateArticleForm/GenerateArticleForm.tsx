import { useState } from 'react';

import ErrorComponent from '../Error/Error';
import useCreateArticle from '../../hooks/useCreateArticle';

import styles from './GenerateArticleForm.module.css';

export default function GenerateArticleForm() {
  const [topic, setTopic] = useState<string>('');
  const { generateArticle, error, isGenerating, resetError } =
    useCreateArticle();

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!topic.trim()) return;

    resetError();
    generateArticle(topic);

    setTopic('');
  };

  return (
    <>
      {error && (
        <ErrorComponent isMainPage={true} message={error.message ?? 'Error'} />
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>Generate new article</span>
          <input
            className={styles.input}
            type='text'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder='Enter topic for the next article'
            disabled={isGenerating}
          />
        </label>

        <button
          type='submit'
          className={styles.button}
          disabled={isGenerating || !topic.trim()}
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </form>
    </>
  );
}
