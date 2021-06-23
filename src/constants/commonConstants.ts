import { ROUTE_CONSTANTS } from './routeConstants';

export const MENU_ACTIONS = {
  GAME_START: 'GAME_START',
  GAME_RESTART: 'GAME_RESTART',
  GAME_RESUME: 'GAME_RESUME',
};

export const MENU_ITEMS = [
  { title: 'start', action: MENU_ACTIONS.GAME_START },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM },
];

export const MENU_ITEMS_PAUSE = [
  { title: 'resume', action: MENU_ACTIONS.GAME_RESUME },
  { title: 'restart', action: MENU_ACTIONS.GAME_RESTART },
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
  name: '',
  surname: '',
  email: '',
  codename: '',
  phone: '',
  password: '',
};

export const MOCK_USER_STATE = {
  name: 'Ivan',
  surname: 'Petrov',
  email: 'email@email.com',
  codename: 'user1',
  phone: '+79919927812',
  password: '123456',
};

export const DEFAULT_LOGIN_STATE = {
  email: '',
  password: '',
};

export const MOCK_LOGIN_STATE = {
  email: 'email@email.com',
  password: '123456',
};
