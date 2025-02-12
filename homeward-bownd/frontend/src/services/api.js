import axios from 'axios';

const API = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com'
});

export default API;