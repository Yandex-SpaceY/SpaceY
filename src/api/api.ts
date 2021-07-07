import axios from 'axios';

import { BASE_URL } from 'constants/commonConstants';

export default axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  timeout: 5000,
  withCredentials: true,
});
