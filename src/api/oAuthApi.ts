import { AxiosResponse } from 'axios';
import api from './api';

export const getServiceId = (payload: string): Promise<AxiosResponse> => (
  api.get(`/oauth/yandex/service-id?redirect_uri=${payload}`)
);

export const signInYandex = (payload: Record<string, string>): Promise<AxiosResponse> => (
  api.post('/oauth/yandex', payload)
);
