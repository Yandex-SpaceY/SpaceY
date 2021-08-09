import { TActionProps, TUserState } from 'store/types.d';
import { USER_ACTIONS } from 'constants/storeConstants';

const initialState = {
  isAuthorized: null,
  pending: false,
  userData: {},
  error: null,
  setting: {},
};

export const userReducer = (
  state = initialState,
  { type, payload }: TActionProps<string, TUserState>
): Record<string, unknown> => {
  switch (type) {
    case USER_ACTIONS.SET_USER_DATA: {
      return { ...state, userData: payload };
    }
    case USER_ACTIONS.ERROR: {
      return { ...state, error: payload };
    }
    case USER_ACTIONS.PENDING: {
      return { ...state, pending: payload };
    }
    case USER_ACTIONS.CLEAR_USER_DATA: {
      return { ...state, userData: {}, isAuthorized: null, settings: {} };
    }
    case USER_ACTIONS.SET_IS_AUTH: {
      return { ...state, isAuthorized: payload };
    }
    case USER_ACTIONS.SET_USER_SETTINGS: {
      return { ...state, setting: payload };
    }
    default: {
      return state;
    }
  }
};
