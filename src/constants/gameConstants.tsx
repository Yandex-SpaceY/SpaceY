import { GAME_SETTINGS } from 'game/constants';

export const GAME_OPTIONS = {
  GAME_AREA_WIDTH: GAME_SETTINGS.GAME_AREA_WIDTH,
  GAME_AREA_HEIGHT: GAME_SETTINGS.GAME_AREA_HEIGHT,
  HULL_STRENGTH_LABLE: 'HULL',
  DISTANCE_LABLE: 'DISTANCE',
  GAME_OVER_TITLE: 'You\'ve crashed',
  GAME_OVER_SCORE_TITLE: 'Distance passed:',
  THEME_TITLE: 'theme',
};

export const THEME_OPTIONS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

export const THEME_OPTIONS_CLASS = {
  [THEME_OPTIONS.PRIMARY]: 'earth',
  [THEME_OPTIONS.SECONDARY]: 'mars'
};

export const THEME_OPTIONS_TEXT = {
  [THEME_OPTIONS.PRIMARY]: 'earth',
  [THEME_OPTIONS.SECONDARY]: 'mars'
};
