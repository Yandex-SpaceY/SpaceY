import axios from 'axios';

export default axios.create({
  responseType: 'json',
  timeout: 5000,
  withCredentials: true,
});
