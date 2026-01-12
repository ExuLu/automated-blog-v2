import { Link } from 'react-router-dom';

import type { Article } from '../../types/article';

import styles from './ArticleListItem.module.css';

type ArticleListItemProps = { article: Article };

const PREVIEW_LENGTH = 99;

const ArticleListItem = ({ article }: ArticleListItemProps) => {
  const shortText = article.content.substring(0, PREVIEW_LENGTH);

  return (
    <Link to={`/articles/${article.id}`} className={styles.card}>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.text}>{`${shortText}...`}</p>
      <span className={styles.linkText}>Read more →</span>
    </Link>
  );
};

export default ArticleListItem;
