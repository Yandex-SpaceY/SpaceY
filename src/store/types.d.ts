import { Action as ReduxAction, compose } from 'redux';

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

export type TUserState = {
  isAuthorized: boolean;
  pending: boolean;
  error: Error | null;
  userData: TUserData;
  alert: IAlert;
};

export type TGameState = {
  isGameStarted: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
  isSoundOn: boolean;
  isVibrationOn: boolean;
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
