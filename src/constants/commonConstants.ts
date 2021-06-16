import { routeConstants } from './routeConstants';
export const MENU_ITEMS = [
  { title: 'start', route: routeConstants.GAME },
  { title: 'my profile', route: routeConstants.PROFILE },
  { title: 'best players', route: routeConstants.LEADERBOARD },
  { title: 'forum', route: routeConstants.FORUM }
];

export const GAME_NAME = 'SpaceY';

export const PAGES_NAME = {
  DASHBOARD: 'DASHBOARD',
  FORUM: 'FORUM',
  LEADERBOARD: 'LEADERBOARD',
  LOGIN: 'LOGIN',
  PROFILE: 'PROFILE',
  PROFILE_EDIT: 'PROFILE EDIT',
  REGISTRATION: 'REGISTRATION'
};

export const LINKS_TEXT = {
  DASHBOARD: 'Main page',
  HAVE_ACCOUNT: 'I have an account',
  NO_ACCOUNT: 'Has no account?',
  PROFILE: 'See my profile',
  PROFILE_EDIT: 'Edit my profile'
};
