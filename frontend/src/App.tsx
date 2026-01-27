import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BlogPage from './routes/BlogPage.tsx';
import PostPage from './routes/PostPage.tsx';

import styles from './App.module.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
