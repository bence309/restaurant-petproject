import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getPizzas = () => api.get('/pizza').then((response) => response.data);
export const getDrinks = () => api.get('/drinks').then((response) => response.data);
export const getDesserts = () => api.get('/dessert').then((response) => response.data);
export const getSauces = () => api.get('/sauces').then((response) => response.data);
export const getPastas = () => api.get('/pasta').then((response) => response.data);
export const getSides = () => api.get('/sides').then((response) => response.data);

// Add more API functions as needed
