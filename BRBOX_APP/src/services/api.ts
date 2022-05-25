import axios from 'axios';
import env from '../../brbox.config.json';

const api = axios.create({
  baseURL: env.apiUrl,
});

export default api;