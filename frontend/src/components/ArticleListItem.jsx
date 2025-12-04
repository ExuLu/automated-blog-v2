import { Link } from 'react-router-dom';

const ArticleListItem = ({ post }) => {
  const shortText = post.text.substring(0, 99);

  return (
    <div>
      <h2>{post.name}</h2>
      <p>{`${shortText}...`}</p>
      <Link to={`/articles/${post.id}`}>Read more</Link>
    </div>
  );
};

export default ArticleListItem;
