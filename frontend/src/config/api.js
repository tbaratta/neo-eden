import axios from 'axios';

// For iPhone using Expo Go, use your computer's local IP address
const API_URL = 'http://10.245.4.2:5000/api';  // Your WiFi IP address

// Create an axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

export const sendMessage = async (message) => {
  try {
    console.log('Sending message to:', `${API_URL}/gemini/ask`);
    const response = await api.post('/gemini/ask', {
      prompt: message
    });

    console.log('Response received:', response.data);
    return {
      reply: response.data.reply || response.data.message || 'No response received'
    };
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out. The server took too long to respond.');
      throw new Error('Request timed out. Please try again.');
    } else if (error.message === 'Network Error') {
      console.error(`Cannot connect to the server at ${API_URL}. Check if the backend is running and accessible.`);
      throw new Error('Cannot connect to the server. Please check your connection and backend server.');
    } else {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: API_URL
      });
      throw new Error(error.response?.data?.message || 'An error occurred while processing your request.');
    }
  }
};