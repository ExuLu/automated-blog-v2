import ArticleListItem from './ArticleListItem';
import Error from './Error';
import Spinner from './Spinner';
import useArticles from '../hooks/useArticles';

import styles from './ArticleList.module.css';
import GenerateArticleForm from './GenerateArticleForm';
const ArticleList = () => {
  const { articles, error, isLoading, refetch } = useArticles();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} isMainPage={true} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Automated Blog</h1>
      <GenerateArticleForm submitAction={refetch} />
      <div className={styles.list}>
        {articles.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
