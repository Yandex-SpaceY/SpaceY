import { AppState, UserState } from 'store/types.d';

export const pendingSelector = (state: AppState): UserState['pending'] => state.user.pending;
export const authSelector = (state: AppState): UserState['isAuth'] => state.user.isAuth;

export const userSelector = (state: AppState): UserState['user'] => state.user.user;

export const errorSelector = (state: AppState): UserState['error'] => state.user.error;
