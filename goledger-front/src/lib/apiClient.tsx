import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.NEXT_PUBLIC_API_USER || '',
    password: process.env.NEXT_PUBLIC_API_PASSWORD || '',
  },
});

if (!process.env.NEXT_PUBLIC_API_USER || !process.env.NEXT_PUBLIC_API_PASSWORD) {
  throw new Error('As credenciais da API não estão definidas nas variáveis de ambiente');
}

export default apiClient;