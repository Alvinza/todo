import axios from 'axios';

const API = axios.create({
  baseURL: 'https://alvin-todo-backend.onrender.com/api', // Backend URL
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
