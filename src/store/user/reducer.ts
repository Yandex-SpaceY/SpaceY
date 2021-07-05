import { TActionProps, TUserState } from 'store/types.d';
import { USER_ACTIONS } from 'constants/storeConstants';

const initialState = {
  isAuth: null,
  pending: false,
  userData: {},
  error: null,
};

export const userReducer = (
  state = initialState,
  action: TActionProps<string, TUserState>
): Record<string, unknown> => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER_DATA: {
      return { ...state, userData: action.payload };
    }
    case USER_ACTIONS.ERROR: {
      return { ...state, error: action.payload };
    }
    case USER_ACTIONS.PENDING: {
      return { ...state, pending: action.payload };
    }
    case USER_ACTIONS.CLEAR_USER_DATA: {
      return { ...state, userData: {}, isAuth: null };
    }
    case USER_ACTIONS.SET_IS_AUTH: {
      return { ...state, isAuth: action.payload };
    }
    default: {
      return state;
    }
  }
};
