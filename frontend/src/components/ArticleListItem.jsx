const ArticleListItem = ({ post }) => {
  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.text}</p>
      <p>{post.name}</p>
      <a href={`/${post.id}`}>Read more</a>
    </div>
  );
};

export default ArticleListItem;
