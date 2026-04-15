import axios from 'axios';
const api = axios.create({
  baseURL: 'https://musicapp-production-bcd8.up.railway.app/api/',
  headers: { 'Content-Type': 'application/json' },
});
export default api;