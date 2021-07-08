import { ROUTE_CONSTANTS } from './routeConstants';

export const enum MENU_ACTIONS {
  GAME_START = 'GAME_START',
  GAME_RESTART = 'GAME_RESTART',
  GAME_RESUME = 'GAME_RESUME',
  SHOW_MAIN_MENU = 'SHOW_MAIN_MENU',
}

export const MENU_ITEMS = [
  { title: 'start', route: null, action: MENU_ACTIONS.GAME_START },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE, action: null },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD, action: null },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM, action: null },
];

export const MENU_ITEMS_PAUSE = [
  { title: 'resume', route: null, action: MENU_ACTIONS.GAME_RESUME },
  { title: 'restart',  route: null, action: MENU_ACTIONS.GAME_RESTART },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE, action: null },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD, action: null },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM, action: null },
];

export const MENU_ITEMS_GAME_OVER = [
  { title: 'retry',  route: null, action: MENU_ACTIONS.GAME_RESTART },
  { title: 'main menu',  route: null, action: MENU_ACTIONS.SHOW_MAIN_MENU }
];
