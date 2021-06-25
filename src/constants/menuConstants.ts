import { ROUTE_CONSTANTS } from './routeConstants';

export const enum MENU_ACTIONS {
  GAME_START = 'GAME_START',
  GAME_RESTART = 'GAME_RESTART',
  GAME_RESUME = 'GAME_RESUME',
}

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
