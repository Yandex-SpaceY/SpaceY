import { AxiosResponse } from 'axios';

import api from './api';

export const getTopics = (page: number, limit: number): Promise<AxiosResponse> => (
  api.get(`/api/topics?page=${page}&limit=${limit}`)
);

export const createTopic = (payload: Record<string, string | number>): Promise<AxiosResponse> => (
  api.post('/api/topics', payload)
);
