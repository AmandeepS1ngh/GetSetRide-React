import axios from 'axios';

const api = axios.create({
  baseURL: 'https://getsetride-backend.onrender.com', // Updated backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;