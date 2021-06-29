import { TAppState, TActionProps, TUserData } from 'store/types.d';
import { USER_ACTIONS } from 'store/constants';
import { getUserInfo } from 'api/authApi';
import { ThunkAction } from 'redux-thunk';

export const setUserError = (error: Error): TActionProps<string, Error> => (
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

export const getUserDataFromServer = (): ThunkAction<void, TAppState, unknown, TActionProps>  => {
  return async dispatch => {
    try {
      dispatch(setUserPending(true));

      const data = await getUserInfo();
      dispatch(setUserData(data.data));
    } catch (error) {
      dispatch(setUserError(error));
    }

    dispatch(setUserPending(false));
  };
};
