import api, { authAPI } from '../config/api';

// Export the auth methods directly from the configured API
export const { login, register } = authAPI; 