import { AxiosResponse } from 'axios';

import { BASE_URL } from 'constants/commonConstants';
import api from './api';

export const changeProfile = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.put(`${BASE_URL}/user/profile`, payload)
);

export const changeProfileAvatar = (payload: FormData): Promise<AxiosResponse> => (
  api.put(`${BASE_URL}/user/profile/avatar`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
);

export const changePassword = (payload: Record<string, FormDataEntryValue>): Promise<AxiosResponse> => (
  api.put(`${BASE_URL}/user/password`, payload)
);

export const getUserSetting = (payload: Record<string, string>): Promise<AxiosResponse> => (
  api.post('/api/users', payload)
);
