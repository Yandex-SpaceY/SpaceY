import { AxiosResponse } from 'axios';

import { BASE_URL } from 'constants/commonConstants';
import api from './api';

export const signup = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.post(`${BASE_URL}/auth/signup`, payload)
);

export const signIn = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.post(`${BASE_URL}/auth/signin`, payload)
);

export const getUserInfo = (): Promise<AxiosResponse> => api.get(`${BASE_URL}/auth/user`);

export const logout = (): Promise<AxiosResponse> => api.post(`${BASE_URL}/auth/logout`);
