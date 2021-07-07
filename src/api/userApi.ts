import { AxiosResponse } from 'axios';
import api from './api';

export const changeProfile = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.put('/user/profile', payload)
);

export const changeProfileAvatar = (payload: FormData): Promise<AxiosResponse> => (
  api.put('/user/profile/avatar', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
);

export const changePassword = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.put('/user/password', payload)
);
