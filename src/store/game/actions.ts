import { TActionProps } from 'store/types.d';
import { GAME_ACTIONS } from 'constants/storeConstants';

export const setIsGameStarted = (isGameStarted: boolean): TActionProps<string, boolean> => (
  {
    type: GAME_ACTIONS.SET_IS_GAME_STARTED,
    payload: isGameStarted,
  }
);

export const setIsGamePaused = (isGamePaused: boolean): TActionProps<string, boolean> => (
  {
    type: GAME_ACTIONS.SET_IS_GAME_PAUSED,
    payload: isGamePaused,
  }
);

export const setIsGameOver = (isGameOver: boolean): TActionProps<string, boolean> => (
  {
    type: GAME_ACTIONS.SET_IS_GAME_OVER,
    payload: isGameOver,
  }
);

export const setLastScore = (lastScore: number): TActionProps<string, number> => (
  {
    type: GAME_ACTIONS.SET_LAST_SCORE,
    payload: lastScore,
  }
);
