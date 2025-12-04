import { useState } from 'react';
import ArticleListItem from './ArticleListItem';
import mockPosts from '../mockPosts';

const ArticleList = () => {
  const [posts, setPosts] = useState(mockPosts);

  return (
    <div>
      <h1>Automatate Blog</h1>
      <div>
        {posts.map((post) => (
          <ArticleListItem post={post} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
