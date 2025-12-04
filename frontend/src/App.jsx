import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import BlogPage from './routes/BlogPage.jsx';
import PostPage from './routes/PostPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate replace to='articles' />} path='/' />
        <Route element={<BlogPage />} path='articles' />
        <Route element={<PostPage />} path='articles/:id' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 1) Create two components: blog and post
// 2) Add styles (in simple style-component way)
// 3) Add router for pages: feed (app/feed), post ( app/posts/:id)
