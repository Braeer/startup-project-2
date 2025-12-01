import axios from 'axios';
import { storage } from '../tokenStorage';
import { clearAuthCookies } from './tokenCokies';
import { authPage } from '@/constant';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      storage.clearToken();
      clearAuthCookies();

      if (typeof window !== 'undefined') {
        window.location.href = authPage;
      }
    }
    return Promise.reject(error);
  },
);
