import { TAppState, TGameState } from 'store/types.d';

export const gameIsGameStartedSelector = (state: TAppState): TGameState['isGameStarted'] => state.game.isGameStarted;
export const gameIsGamePausedSelector = (state: TAppState): TGameState['isGamePaused'] => state.game.isGamePaused;
export const gameIsGameOverSelector = (state: TAppState): TGameState['isGameOver'] => state.game.isGameOver;
export const gameLastScoreSelector = (state: TAppState): TGameState['lastScore'] => state.game.lastScore;
