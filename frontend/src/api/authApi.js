import axios from 'axios';

const APIURL= import.meta.env.API_URL || 'htttps://notetaker-9mah.onrender.com';

const api = axios.create({
  baseURL: '/auth',
  withCredentials: true,
});

export function login(email, password) {
  return api.post('/login', { email, password }).then((response) => response.data);
}

export function register(name, email, password) {
  return api.post('/register', { name, email, password }).then((response) => response.data);
}

export function logout() {
  return api.post('/logout').then((response) => response.data);
}
