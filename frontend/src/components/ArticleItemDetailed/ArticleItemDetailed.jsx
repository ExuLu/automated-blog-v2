import { Link, useParams } from 'react-router-dom';

import styles from './ArticleItemDetailed.module.css';
import useArticle from '../../hooks/useArticle';
import Error from '../Error';
import BackLink from '../BackLink';
import Spinner from '../Spinner';

const ArticleItemDetailed = () => {
  const { id: articleId } = useParams();
  const { article, isLoading, error } = useArticle(articleId);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!article) return <p className={styles.notFound}>Article not found</p>;

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.text}>{article.content}</p>
      <p className={styles.meta}>
        {new Date(article.createdAt).toLocaleString()}
      </p>
      <BackLink />
    </div>
  );
};

export default ArticleItemDetailed;
