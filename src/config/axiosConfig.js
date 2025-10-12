import axios from 'axios';

const axiosInstance = axios.create({
  // Use site root as default base so absolute paths resolve reliably
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If requesting static local files inside /admin/data, bypass any API base URL
    // (some envs set VITE_API_BASE_URL to an external server like http://localhost:3000/api)
    // and that causes requests like http://localhost:3000/api/admin/data/... which fail
    // For static assets served by Vite (public/admin/data), force requests to the app root.
    if (
      config &&
      typeof config.url === 'string' &&
      config.url.startsWith('/admin/data')
    ) {
      config.baseURL = '';
    }

    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('API Response:', response.status, response.config.url);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.error('Unauthorized access - redirecting to login');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', status, data?.message || error.message);
      }
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
