import { AxiosResponse } from 'axios';
import api from './api';

export const signup = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.post('/auth/signup', payload)
);

export const signin = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.post('/auth/signin', payload)
);

export const getUserInfo = (): Promise<AxiosResponse> => api.get('/auth/user');

export const logout = (): Promise<AxiosResponse> => api.post('/auth/logout');
