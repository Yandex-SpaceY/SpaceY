import { AxiosResponse } from 'axios';
import api from './api';

export const addToLeaderboard = (
  payload: Record<string, string | Record<string, string | number | null>>
): Promise<AxiosResponse> => (
  api.post('/leaderboard', payload)
);

export const getAllLeaderboard = (payload: Record<string, string | number>): Promise<AxiosResponse> => (
  api.post('/leaderboard/all', payload)
);
