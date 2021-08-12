import { TAppState, TUserState } from 'store/types.d';

export const userPendingSelector = (state: TAppState): TUserState['pending'] => state.user.pending;
export const userAuthSelector = (state: TAppState): TUserState['isAuthorized'] => state.user.isAuthorized;
export const userErrorSelector = (state: TAppState): TUserState['error'] => state.user.error;
export const userUserDataSelector = (state: TAppState): TUserState['userData'] => state.user.userData;
export const userAlertSelector = (state: TAppState): TUserState['alert'] => state.user.alert;
