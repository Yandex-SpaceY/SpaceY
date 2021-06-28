import { TActionProps, TUserState } from 'store/types.d';
import { USER_ACTIONS } from 'store/constants';

const initialState = {
  isAuth: false,
  pending: false,
  userData: null
};

export const userReducer
= (state = initialState, action: TActionProps<string, TUserState>): Record<string, unknown> => {
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
    default: {
      return state;
    }
  }

};
