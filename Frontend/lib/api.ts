import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Only log in development
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  console.log('🔗 API URL:', API_URL);
  console.log('🌍 Environment:', process.env.NODE_ENV);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Important for CORS with credentials
});

api.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
      console.log('📤 Making request to:', fullUrl);
    }
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        if (isDevelopment) {
          console.log('🔑 Token attached to request');
        }
      }
    }
    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('❌ Request setup error:', error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('✅ Response received:', response.status, response.config?.url ?? 'unknown');
    }
    return response;
  },
  (error) => {
    if (isDevelopment) {
      if (error.response) {
        console.error('❌ API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url ?? 'unknown',
        });
      } else if (error.request) {
        console.error('❌ No response from server:', {
          message: error.message,
          code: error.code,
          url: error.config?.url ?? 'unknown',
        });
      } else {
        console.error('❌ Request error:', error.message);
      }
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        console.error('🔴 Cannot connect to backend. Make sure it\'s running on', API_URL);
      }
    }
    
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;