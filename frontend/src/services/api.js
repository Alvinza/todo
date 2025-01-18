import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Adjust to your backend URL
});

export const login = (userData) => API.post('/auth/login', userData);
export const register = (userData) => API.post('/auth/register', userData);
export const getTasks = () => API.get('/tasks');
export const addTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (taskId, updatedData) =>
  API.put(`/tasks/${taskId}`, updatedData);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
