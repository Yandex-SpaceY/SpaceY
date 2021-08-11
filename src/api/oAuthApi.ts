import { AxiosResponse } from 'axios';

import { BASE_URL } from 'constants/commonConstants';
import api from './api';

export const getServiceId = (payload: string): Promise<AxiosResponse> => (
  api.get(`${BASE_URL}/oauth/yandex/service-id?redirect_uri=${payload}`)
);

export const signInYandex = (payload: Record<string, string>): Promise<AxiosResponse> => (
  api.post(`${BASE_URL}/oauth/yandex`, payload)
);
