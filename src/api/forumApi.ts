import { AxiosResponse } from 'axios';

import api from './api';

export const getTopics = (page: number, limit: number): Promise<AxiosResponse> => (
  api.get(`/api/topics?page=${page}&limit=${limit}`)
);

export const getCurrentTopic = (topicId: number, page: number, limit: number): Promise<AxiosResponse> => (
  api.get(`/api/topics/${topicId}?page=${page}&limit=${limit}`)
);

export const createTopic = (payload: Record<string, string | number>): Promise<AxiosResponse> => (
  api.post('/api/topics', payload)
);

export const createMessage = (payload: Record<string, string | number>): Promise<AxiosResponse> => (
  api.post('/api/messages', payload)
);
