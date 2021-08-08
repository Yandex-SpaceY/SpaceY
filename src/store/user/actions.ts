import { ALERT_TEXTS } from 'constants/avatarConstarts';
import { ThunkAction } from 'redux-thunk';

import { getUserInfo } from 'api/authApi';
import { TAppState, TActionProps, TUserData, IAlert } from 'store/types.d';
import { USER_ACTIONS } from 'constants/storeConstants';

export const setUserError = (error: Error | null): TActionProps<string, Error | null> => ({
  type: USER_ACTIONS.ERROR,
  payload: error,
});

export const setAlert = (alert: IAlert | null): TActionProps<string, IAlert | null> => ({
  type: USER_ACTIONS.ALERT,
  payload: alert,
});

export const setUserPending = (pending: boolean): TActionProps<string, boolean> => ({
  type: USER_ACTIONS.PENDING,
  payload: pending,
});

export const setUserData = (userData: TUserData): TActionProps<string, TUserData> => ({
  type: USER_ACTIONS.SET_USER_DATA,
  payload: userData,
});

export const clearUserData = (): TActionProps => ({
  type: USER_ACTIONS.CLEAR_USER_DATA,
  payload: {},
});

export const setisAuthorized = (isAuthorized: boolean | null): TActionProps => ({
  type: USER_ACTIONS.SET_IS_AUTH,
  payload: isAuthorized,
});

export const getUserDataFromServer = (): ThunkAction<void, TAppState, unknown, TActionProps> => {
  return async (dispatch) => {
    try {
      dispatch(setUserError(null));
      dispatch(setUserPending(true));
      const data = await getUserInfo();
      const alert = {
        title: ALERT_TEXTS.PROFILE,
      };
      dispatch(setAlert(alert));
      dispatch(setUserData(data.data));
      dispatch(setisAuthorized(true));
    } catch (error) {
      const alert = {
        title: ALERT_TEXTS.PROFILE,
        text: error.message,
        type: 'error',
      };
      dispatch(setAlert(alert));
      dispatch(setUserError(error));
      dispatch(setisAuthorized(false));
    }

    dispatch(setUserPending(false));
  };
};
