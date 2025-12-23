import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gym-system-api-mbr7.onrender.com/api',
});

// Interceptor para enviar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
