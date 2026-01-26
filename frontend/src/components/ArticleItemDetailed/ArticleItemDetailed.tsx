import BackLink from '../BackLink/BackLink';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import useArticle from '../../hooks/useArticle';

import styles from './ArticleItemDetailed.module.css';

const ArticleItemDetailed = () => {
  const { article, isLoading, error } = useArticle();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
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
