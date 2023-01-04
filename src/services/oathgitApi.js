import api from './api';

export async function postOathgit(code) {
  const response = await api.post('/login', { code });
  return response.data;
}
