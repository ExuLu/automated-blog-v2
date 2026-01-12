import { Link } from 'react-router-dom';

import type { Article } from '../../types/article';

import styles from './ArticleListItem.module.css';

const ArticleListItem = ({ article }: { article: Article }) => {
  const shortText = article.content.substring(0, 99);

  return (
    <Link to={`/articles/${article.id}`} className={styles.card}>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.text}>{`${shortText}...`}</p>
      <span className={styles.linkText}>Read more →</span>
    </Link>
  );
};

export default ArticleListItem;
