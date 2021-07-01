import { TAppState, TUserState } from 'store/types.d';

export const userPendingSelector = (state: TAppState): TUserState['pending'] => state.user.pending;
export const userAuthSelector = (state: TAppState): TUserState['isAuth'] => state.user.isAuth;
export const userEerrorSelector = (state: TAppState): TUserState['error'] => state.user.error;
export const userUserDataSelector = (state: TAppState): TUserState['userData'] => state.user.userData;
