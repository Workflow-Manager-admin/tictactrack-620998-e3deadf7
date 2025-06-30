import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const gameService = {
  createGame: () => api.post('/api/games'),
  makeMove: (gameId, position) => api.post(`/api/games/${gameId}/move`, { position }),
  getActiveGame: () => api.get('/api/games/active'),
  getGameHistory: () => api.get('/api/games/history'),
};

export const authService = {
  login: (credentials) => api.post('/auth/token', credentials),
  register: (userData) => api.post('/auth/register', userData),
};
