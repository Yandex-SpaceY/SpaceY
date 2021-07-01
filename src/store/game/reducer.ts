import { TActionProps, TGameState } from 'store/types.d';
import { GAME_ACTIONS } from 'constants/storeConstants';

const initialState = {
  isGameStarted: false,
  isGameOver: false,
  isGamePaused: false,
  lastScore: 0
};

export const gameReducer = (
  state = initialState,
  action: TActionProps<string, TGameState>
): Record<string, unknown> => {
  switch (action.type) {
    case GAME_ACTIONS.SET_IS_GAME_STARTED: {
      return { ...state, isGameStarted: action.payload };
    }
    case GAME_ACTIONS.SET_IS_GAME_PAUSED: {
      return { ...state, isGamePaused: action.payload };
    }
    case GAME_ACTIONS.SET_IS_GAME_OVER: {
      return { ...state, isGameOver: action.payload };
    }
    case GAME_ACTIONS.SET_LAST_SCORE: {
      return { ...state, lastScore: action.payload };
    }
    default: {
      return state;
    }
  }
};
