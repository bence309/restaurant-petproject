import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getPizzas = () => api.get('/pizza').then((response) => response.data);

// Add more API functions as needed
