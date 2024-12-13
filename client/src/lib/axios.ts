import a from 'axios';
import { backendUrl } from './utils';

const axios = a.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axios;
