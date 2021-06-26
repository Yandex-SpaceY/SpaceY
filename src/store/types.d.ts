import { Action as ReduxAction, compose } from 'redux';

export type AppState = {
  user: UserState;
};

export type UserType = {
  id: number;
  login: string;
  avatar: string | null;
  first_name: string;
  second_name: string;
  display_name: string | null;
  email: string;
  phone: string;
};

export type UserState = {
  isAuth: boolean;
  pending: boolean;
  error?: boolean;
  user: UserType | null;
};

export type ActionProps<T extends string = string, P = void> = P extends void
  ? ReduxAction<T>
  : ReduxAction<T> & Readonly<{ payload: P }>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
