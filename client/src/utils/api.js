import axios from 'axios';
import { sampleProperties } from './sampleData';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const isOffline = !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const authAPI = {
  register: async (data) => {
    if (isOffline) {
      await delay(500);
      const token = 'demo-token-' + Date.now();
      const user = { _id: 'demo-user', name: data.name, email: data.email, role: data.role || 'buyer' };
      localStorage.setItem('token', token);
      return { data: { token, user } };
    }
    return API.post('/auth/register', data);
  },
  login: async (data) => {
    if (isOffline) {
      await delay(500);
      const token = 'demo-token-' + Date.now();
      const user = { _id: 'demo-user', name: 'Demo User', email: data.email, role: 'buyer' };
      localStorage.setItem('token', token);
      return { data: { token, user } };
    }
    return API.post('/auth/login', data);
  },
  getMe: async () => {
    if (isOffline) {
      await delay(300);
      return { data: { _id: 'demo-user', name: 'Demo User', email: 'demo@atoz.com', role: 'buyer' } };
    }
    return API.get('/auth/me');
  },
};

export const propertyAPI = {
  getAll: async (params = {}) => {
    if (isOffline) {
      await delay(300);
      let filtered = [...sampleProperties];
      if (params.type) filtered = filtered.filter(p => p.type === params.type);
      if (params.propertyType) filtered = filtered.filter(p => p.propertyType === params.propertyType);
      if (params.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.city.toLowerCase().includes(s) || p.address.toLowerCase().includes(s));
      }
      if (params.minPrice) filtered = filtered.filter(p => p.price >= Number(params.minPrice));
      if (params.maxPrice) filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
      if (params.beds) filtered = filtered.filter(p => p.beds >= Number(params.beds));
      if (params.sort === 'price') filtered.sort((a, b) => a.price - b.price);
      else if (params.sort === '-price') filtered.sort((a, b) => b.price - a.price);
      else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 9;
      const start = (page - 1) * limit;
      return { data: { properties: filtered.slice(start, start + limit), totalPages: Math.ceil(filtered.length / limit), currentPage: page, total: filtered.length } };
    }
    return API.get('/properties', { params });
  },
  getOne: async (id) => {
    if (isOffline) {
      await delay(300);
      const prop = sampleProperties.find(p => p._id === id);
      if (!prop) throw new Error('Not found');
      return { data: prop };
    }
    return API.get(`/properties/${id}`);
  },
  getFeatured: async () => {
    if (isOffline) {
      await delay(300);
      return { data: sampleProperties.filter(p => p.isFeatured) };
    }
    return API.get('/properties/featured');
  },
  create: (data) => API.post('/properties', data),
  update: (id, data) => API.put(`/properties/${id}`, data),
  delete: (id) => API.delete(`/properties/${id}`),
};

export const contactAPI = {
  send: async (data) => {
    if (isOffline) {
      await delay(500);
      return { data: { message: 'Message sent successfully (demo mode)' } };
    }
    return API.post('/contacts', data);
  },
};

export default API;
