import axios from 'axios';
import { pb } from '../lib/pocketbase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  if (pb.authStore.isValid) {
    config.headers.Authorization = `Bearer ${pb.authStore.token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      pb.authStore.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;