import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const propertyAPI = {
  getAll: (params) => API.get('/properties', { params }),
  getOne: (id) => API.get(`/properties/${id}`),
  getFeatured: () => API.get('/properties/featured'),
  create: (data) => API.post('/properties', data),
  update: (id, data) => API.put(`/properties/${id}`, data),
  delete: (id) => API.delete(`/properties/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contacts', data),
};

export default API;
