import { Link, useParams } from 'react-router-dom';

import styles from './ArticleItemDetailed.module.css';
import useArticle from '../hooks/useArticle';

const ArticleItemDetailed = () => {
  const { id: articleId } = useParams();
  const { article, isLoading, error } = useArticle(articleId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.root}>
      {article ? (
        <>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.text}>{article.content}</p>
          <p className={styles.meta}>{article.createdAt}</p>
        </>
      ) : (
        <p className={styles.notFound}>Article not found</p>
      )}
      <Link className={styles.backLink} to='/articles'>
        Back to Main Page
      </Link>
    </div>
  );
};

export default ArticleItemDetailed;
