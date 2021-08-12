import { AxiosResponse } from 'axios';

import { BASE_URL } from 'constants/commonConstants';
import api from './api';

export const addToLeaderboard = (
  payload: Record<string, string | Record<string, string | number | null>>
): Promise<AxiosResponse> => (
  api.post(`${BASE_URL}/leaderboard`, payload)
);

export const getAllLeaderboard = (payload: Record<string, string | number>): Promise<AxiosResponse> => (
  api.post(`${BASE_URL}/leaderboard/all`, payload)
);
