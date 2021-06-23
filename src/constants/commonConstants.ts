import { ROUTE_CONSTANTS } from './routeConstants';

export const MENU_ITEMS = [
  { title: 'start', route: ROUTE_CONSTANTS.GAME },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM },
];

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

export const LINK_TEXTS = {
  DASHBOARD: 'Main page',
  LOGIN: 'I have an account',
  NEW_GAME: 'New game',
  PROFILE: 'See my profile',
  PROFILE_EDIT: 'Edit my profile',
  SIGNUP: 'Has no account?',
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