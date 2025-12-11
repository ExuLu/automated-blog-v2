import { useState } from 'react';

import Error from './Error';
import { generateAndAddArticle } from '../api/articlesApi';

import styles from './GenerateArticleForm.module.css';

export default function GenerateArticleForm({ submitAction }) {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await generateAndAddArticle(topic);
      submitAction();
    } catch (err) {
      setError(err.message || 'Failed to generate topic');
    } finally {
      setIsLoading(false);
    }

    setTopic('');
  };

  return (
    <>
      {error && <Error isMainPage={true} message={error} />}

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
