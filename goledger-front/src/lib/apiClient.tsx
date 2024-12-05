import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ec2-54-91-215-149.compute-1.amazonaws.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.API_USERNAME || 'psAdmin',
    password: process.env.API_PASSWORD || 'goledger',
  },
});

export default apiClient;