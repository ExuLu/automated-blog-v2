import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import BlogPage from './routes/BlogPage.jsx';
import PostPage from './routes/PostPage.jsx';

import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>
            <Route element={<Navigate replace to='/articles' />} path='/' />
            <Route element={<BlogPage />} path='/articles' />
            <Route element={<PostPage />} path='/articles/:id' />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
