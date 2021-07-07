import { GAME_ACTIONS } from 'constants/storeConstants';
import { TActionProps, TGameState } from 'store/types.d';

const initialState = {
  isGameStarted: false,
  isGameOver: false,
  isGamePaused: false,
  lastScore: 0
};

export const gameReducer = (
  state = initialState,
  { type, payload }: TActionProps<string, TGameState>
): Record<string, unknown> => {
  switch (type) {
    case GAME_ACTIONS.SET_IS_GAME_STARTED: {
      return { ...state, isGameStarted: payload };
    }
    case GAME_ACTIONS.SET_IS_GAME_PAUSED: {
      return { ...state, isGamePaused: payload };
    }
    case GAME_ACTIONS.SET_IS_GAME_OVER: {
      return { ...state, isGameOver: payload };
    }
    case GAME_ACTIONS.SET_LAST_SCORE: {
      return { ...state, lastScore: payload };
    }
    default: {
      return state;
    }
  }
};
