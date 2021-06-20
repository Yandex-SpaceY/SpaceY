import { AxiosResponse } from 'axios';
import api from './api';

export const changeProfile = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.post('/user/profile', payload)
);

export const changeProfileAvatar = (payload: FormData): Promise<AxiosResponse> => (
  api.post('/user/profile/avatar', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
);
