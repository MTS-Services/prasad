import axios from 'axios';

/**
 * API Service for making HTTP requests
 * Provides methods for GET, POST, PUT, DELETE operations
 */
class ApiService {
  constructor() {
    // Base URL for API requests
    this.baseURL = '';

    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        // Handle common errors
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          if (status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          return Promise.reject(
            new Error(data.message || `HTTP ${status} Error`)
          );
        } else if (error.request) {
          // Network error
          return Promise.reject(
            new Error('Network error - please check your connection')
          );
        } else {
          // Something else happened
          return Promise.reject(
            new Error(error.message || 'An unexpected error occurred')
          );
        }
      }
    );
  }

  /**
   * GET request
   * @param {string} url - The endpoint URL
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async get(url, config = {}) {
    return await this.client.get(url, config);
  }

  /**
   * POST request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async post(url, data = {}, config = {}) {
    return await this.client.post(url, data, config);
  }

  /**
   * PUT request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async put(url, data = {}, config = {}) {
    return await this.client.put(url, data, config);
  }

  /**
   * DELETE request
   * @param {string} url - The endpoint URL
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async delete(url, config = {}) {
    return await this.client.delete(url, config);
  }

  /**
   * PATCH request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Additional axios config
   * @returns {Promise} Response data
   */
  async patch(url, data = {}, config = {}) {
    return await this.client.patch(url, data, config);
  }
}

// Export singleton instance
export default new ApiService();
