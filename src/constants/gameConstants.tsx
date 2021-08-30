import { GAME_SETTINGS } from 'game/constants';

export const GAME_OPTIONS = {
  GAME_AREA_WIDTH: GAME_SETTINGS.GAME_AREA_WIDTH,
  GAME_AREA_HEIGHT: GAME_SETTINGS.GAME_AREA_HEIGHT,
  HULL_STRENGTH_LABLE: 'HULL',
  DISTANCE_LABLE: 'DISTANCE',
  GAME_OVER_TITLE: 'You\'ve crashed',
  GAME_OVER_SCORE_TITLE: 'Distance passed:',
  THEME_TITLE: 'theme',
  SKILL_TITLE: 'skill',
};

export const THEME_OPTIONS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

export const THEME_OPTIONS_CLASS = {
  [THEME_OPTIONS.PRIMARY]: 'earth',
  [THEME_OPTIONS.SECONDARY]: 'mars',
};

export const THEME_OPTIONS_TEXT = {
  [THEME_OPTIONS.PRIMARY]: 'earth',
  [THEME_OPTIONS.SECONDARY]: 'mars',
};

export const SKILL_OPTIONS = {
  FIRST_LEVEL: 1,
  SECOND_LEVEL: 2,
  THIRD_LEVEL: 3,
};
export const SKILL_OPTIONS_TEXT = {
  [SKILL_OPTIONS.FIRST_LEVEL]: 'novice',
  [SKILL_OPTIONS.SECOND_LEVEL]: 'advanced',
  [SKILL_OPTIONS.THIRD_LEVEL]: 'pro'
};
