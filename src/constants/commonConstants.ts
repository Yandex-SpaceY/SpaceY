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

export const defaultUserState = {
  name: '',
  surname: '',
  email: '',
  codename: '',
  phone: '',
  password: '',
};
