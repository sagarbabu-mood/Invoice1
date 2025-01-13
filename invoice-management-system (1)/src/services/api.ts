import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (name: string, email: string, password: string) => api.post('/auth/register', { name, email, password });
export const getInvoices = () => api.get('/invoices');
export const createInvoice = (invoiceData: any) => api.post('/invoices', invoiceData);
export const updateInvoice = (id: string, invoiceData: any) => api.put(`/invoices/${id}`, invoiceData);
export const deleteInvoice = (id: string) => api.delete(`/invoices/${id}`);

export default api;

