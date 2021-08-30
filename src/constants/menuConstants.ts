import { ROUTE_CONSTANTS } from './routeConstants';
import { TMenuItem } from '../components/menu/Menu';
import { TOGGLE_ITEMS } from './commonConstants';

export const enum MENU_ACTIONS {
  GAME_START = 'GAME_START',
  GAME_SOUND_SWITCH = 'GAME_SOUND_SWITCH',
  GAME_VIBRATION_SWITCH = 'GAME_VIBRATION_SWITCH',
  GAME_THEME_SWITCH = 'GAME_THEME_SWITCH',
  GAME_RESTART = 'GAME_RESTART',
  GAME_RESUME = 'GAME_RESUME',
  SHOW_MAIN_MENU = 'SHOW_MAIN_MENU',
}

export const MENU_ITEMS: TMenuItem[] = [
  { title: 'start', route: null, action: MENU_ACTIONS.GAME_START },
  { title: 'sound', options: TOGGLE_ITEMS, route: null, action: MENU_ACTIONS.GAME_SOUND_SWITCH },
  { title: 'vibration', mobileOnly: true, options: TOGGLE_ITEMS, route: null, action: MENU_ACTIONS.GAME_VIBRATION_SWITCH },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE, action: null },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD, action: null },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM, action: null },
  { title: 'theme', route: null, action: MENU_ACTIONS.GAME_THEME_SWITCH },
];

export const MENU_ITEMS_PAUSE: TMenuItem[] = [
  { title: 'resume', route: null, action: MENU_ACTIONS.GAME_RESUME },
  { title: 'restart', route: null, action: MENU_ACTIONS.GAME_RESTART },
  { title: 'sound', options: TOGGLE_ITEMS, route: null, action: MENU_ACTIONS.GAME_SOUND_SWITCH },
  { title: 'vibration', mobileOnly: true, options: TOGGLE_ITEMS, route: null, action: MENU_ACTIONS.GAME_VIBRATION_SWITCH },
  { title: 'my profile', route: ROUTE_CONSTANTS.PROFILE, action: null },
  { title: 'best players', route: ROUTE_CONSTANTS.LEADERBOARD, action: null },
  { title: 'forum', route: ROUTE_CONSTANTS.FORUM, action: null },
  { title: 'theme', route: null, action: MENU_ACTIONS.GAME_THEME_SWITCH },
];

export const MENU_ITEMS_GAME_OVER: TMenuItem[] = [
  { title: 'retry', route: null, action: MENU_ACTIONS.GAME_RESTART },
  { title: 'main menu', route: null, action: MENU_ACTIONS.SHOW_MAIN_MENU },
];

export const MENU_ITEMS_NOT_FOUND: TMenuItem[] = [{ title: 'flight back', route: ROUTE_CONSTANTS.GAME, action: null }];
