import { ThunkAction } from 'redux-thunk';

import { getUserInfo } from 'api/authApi';
import { TAppState, TActionProps, TUserData } from 'store/types.d';
import { USER_ACTIONS } from 'constants/storeConstants';

export const setUserError = (error: Error| null): TActionProps<string, Error | null> => (
  {
    type: USER_ACTIONS.ERROR,
    payload: error,
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

export const getUserDataFromServer = (): ThunkAction<void, TAppState, unknown, TActionProps>  => {
  return async dispatch => {
    try {
      dispatch(setUserError(null));
      dispatch(setUserPending(true));

      const data = await getUserInfo();
      dispatch(setUserData(data.data));
    } catch (error) {
      dispatch(setUserError(error));
    }

    dispatch(setUserPending(false));
  };
};
