import Constants from 'expo-constants';
import { Platform } from 'react-native';
import axios from 'axios';

// Get the local IP address for development
const localhost = Platform.select({
  ios: Constants.expoConfig?.hostUri?.split(':')[0] ?? '10.0.0.252',
  android: '10.0.2.2',
  default: 'localhost'
});



// API Configuration
const DEV_API_URL = `http://${localhost}:3000/api`;
const PROD_API_URL = 'https://your-production-url.com/api'; // Update this when you have a production URL

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;


export const API_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
};


// API Headers
export const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Create an axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      status: error.response?.status,
      response: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const response = await api.post(API_ENDPOINTS.login, { email, password });
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data
      });
      throw error.response?.data?.message || 'Login failed. Please try again.';
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration for:', userData.email);
      const response = await api.post(API_ENDPOINTS.register, userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error details:', {
        status: error.response?.status,
        data: error.response?.data
      });
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/gemini/analyze', { prompt: message });
    return {
      reply: response.data.reply || response.data.message || 'No response received'
    };
  } catch (error) {
    console.error('Message error:', error);
    throw new Error('Failed to send message. Please try again.');
  }
};

export default api;
