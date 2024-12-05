import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.API_USERNAME || 'psAdmin',
    password: process.env.API_PASSWORD || 'goledger',
  },
});

export default apiClient;