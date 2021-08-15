import { ThunkAction } from 'redux-thunk';

import { getUserInfo } from 'api/authApi';
import { getUserSetting, updateUserSetting } from 'api/userApi';
import { TAppState, TActionProps, TUserData, TUserSettings, IAlert } from 'store/types.d';
import { USER_ACTIONS } from 'constants/storeConstants';
import { setIsSoundOn } from 'store/game/actions';

export const setUserError = (error: Error | null): TActionProps<string, Error | null> => (
  {
    type: USER_ACTIONS.ERROR,
    payload: error,
  }
);

export const setAlert = (alert: IAlert | null): TActionProps<string, IAlert | null> => (
  {
    type: USER_ACTIONS.ALERT,
    payload: alert,
  }
);

export const setUserPending = (pending: boolean): TActionProps<string, boolean> => (
  {
    type: USER_ACTIONS.PENDING,
    payload: pending,
  }
);

export const setUserData = (userData: TUserData): TActionProps<string, TUserData> => (
  {
    type: USER_ACTIONS.SET_USER_DATA,
    payload: userData,
  }
);

export const clearUserData = (): TActionProps => (
  {
    type: USER_ACTIONS.CLEAR_USER_DATA,
    payload: {},
  }
);

export const setisAuthorized = (isAuthorized: boolean | null): TActionProps => (
  {
    type: USER_ACTIONS.SET_IS_AUTH,
    payload: isAuthorized,
  }
);

export const setUserSetting = (setting: TUserSettings): TActionProps => (
  {
    type: USER_ACTIONS.SET_USER_SETTINGS,
    payload: setting,
  }
);

export const updateUserSettingsToServer = (newSetting: TUserSettings):
  ThunkAction<void, TAppState, unknown, TActionProps> => {
  return async dispatch => {
    try {
      await updateUserSetting(newSetting);
      dispatch(setUserSetting(newSetting));
    } catch (error) {
      dispatch(setUserError(error));
    }
  };
};

export const getUserDataFromServer = (): ThunkAction<void, TAppState, unknown, TActionProps> => {
  return async dispatch => {
    try {
      dispatch(setUserError(null));
      dispatch(setUserPending(true));

      const { data } = await getUserInfo();
      const { data: { payload } } = await getUserSetting(data);
      const { sound } = payload.setting;

      dispatch(setUserData(data));
      dispatch(setisAuthorized(true));
      dispatch(setUserSetting(payload.setting));
      dispatch(setIsSoundOn(sound));
    } catch (error) {
      dispatch(setUserError(error));
      dispatch(setisAuthorized(false));
    }

    dispatch(setUserPending(false));
  };
};
