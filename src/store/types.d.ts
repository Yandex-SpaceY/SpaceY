import { Action as ReduxAction, compose } from 'redux';

export type TAppState = {
  user: TUserState;
  game: TGameState;
};

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
  isAuth: boolean;
  pending: boolean;
  error?: Error;
  userData: UserType;
};

export type TGameState = {
  isGameStarted: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
  lastScore: number;
};

export type TActionProps<T extends string = string, P = void> = P extends void
  ? ReduxAction<T>
  : ReduxAction<T> & Readonly<{ payload: P }>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
