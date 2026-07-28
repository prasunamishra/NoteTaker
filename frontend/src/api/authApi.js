import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/auth`,
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
