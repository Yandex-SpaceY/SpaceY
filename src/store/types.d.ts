import { Action as ReduxAction, compose } from 'redux';
import { THEME_OPTIONS } from 'constants/gameConstants';

export type TUserData = {
  id: number;
  login: string;
  avatar: string | null;
  first_name: string;
  second_name: string;
  display_name: string | null;
  email: string;
  phone: string;
};

export type TUserSettings = {
  id: number;
  theme: ValueOfTheme;
  skill: ValueOfSkill;
  sound: boolean;
  vibration: boolean;
}

export type TUserState = {
  isAuthorized: boolean;
  pending: boolean;
  error: Error | null;
  userData: TUserData;
  alert: IAlert;
  setting: TUserSettings;
};

export type TGameState = {
  isGameStarted: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
  skillLevel: number;
  isSoundOn: boolean;
  vibration: boolean;
  lastScore: number;
};

export type TAppState = {
  user: TUserState;
  game: TGameState;
};

export type TActionProps<T = string, P = unknown> = ReduxAction<T> & Readonly<{ payload: P }>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

export interface IAlert {
  title?: string;
  message?: string;
  type?: string;
}

type ThemeKeys = keyof typeof THEME_OPTIONS;
export type ValueOfTheme = typeof THEME_OPTIONS[ThemeKeys];

type SkillKeys = keyof typeof SKILL_OPTIONS;
export type ValueOfSkill = typeof SKILL_OPTIONS[SkillKeys];
export interface IModifier {
  [key: string]: boolean | ValueOfTheme | ValueOfSkill
}
