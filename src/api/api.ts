import axios from 'axios';

export default axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2/',
  responseType: 'json',
  timeout: 5000,
  withCredentials: true,
});
