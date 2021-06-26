import { ActionProps } from 'store/types.d';

const initialState = {};

export const userReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case 'TEST': {
      return { ...state, user: {} };
    }
    // no default
  }

  return state;
};
