const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
  const config = { ...options };

  if (config.body && !config.headers) {
    config.headers = { 'Content-Type': 'application/json' };
  }

  const response = await fetch(`${API_URL}${path}`, config);

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || 'Something went wrong';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getAllArticles() {
  const result = await request('/articles');
  return result.data.articles;
}

export async function getArticleById(id) {
  const result = await request(`/articles/${id}`);
  return result.data.article;
}

export async function generateAndAddArticle(topic) {
  const config = { method: 'POST', body: JSON.stringify({ topic }) };
  const result = await request(`/articles/generate`, config);
  return result.data.article;
}
