import { DEFAULT_LOGIN_STATE, DEFAULT_USER_STATE } from 'constants/commonConstants';

export type TUser = typeof DEFAULT_USER_STATE;

export type TUserKeys = keyof TUser;

export type TLogin = typeof DEFAULT_LOGIN_STATE;

export type TLoginKeys = keyof TLogin;