export const GAME_NAME = 'SpaceY';

export const PAGE_NAMES = {
  DASHBOARD: 'DASHBOARD',
  FORUM: 'FORUM',
  LEADERBOARD: 'LEADERBOARD',
  LOGIN: 'LOGIN',
  PROFILE: 'PROFILE',
  PROFILE_EDIT: 'PROFILE EDIT',
  REGISTRATION: 'REGISTRATION',
};

export const DEFAULT_USER_STATE = {
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  password: '',
};

export type userType = typeof DEFAULT_USER_STATE;

export type userKeys = keyof userType;

export const DEFAULT_LOGIN_STATE = {
  login: '',
  password: '',
};

export type loginType = typeof DEFAULT_LOGIN_STATE;

export type loginKeys = keyof loginType;
