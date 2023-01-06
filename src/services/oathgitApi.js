import api from './api';

export async function postOathgit(code) {
  const response = await api.post('/auth/sign-in/github', { code });
  return response.data;
}
