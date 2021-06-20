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

export const MOCK_USER_STATE = {
  first_name: 'Ivan',
  second_name: 'Petrov',
  email: 'email1@email.com',
  login: 'user1',
  phone: '+79919927812',
  password: '123456',
};

export const DEFAULT_LOGIN_STATE = {
  login: '',
  password: '',
};

export const MOCK_LOGIN_STATE = {
  login: 'email1@email.com',
  password: '123456',
};
