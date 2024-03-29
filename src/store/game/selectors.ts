import { TAppState, TGameState } from 'store/types.d';

export const gameIsGameStartedSelector = (state: TAppState): TGameState['isGameStarted'] => state.game.isGameStarted;
export const gameIsGamePausedSelector = (state: TAppState): TGameState['isGamePaused'] => state.game.isGamePaused;
export const gameIsGameOverSelector = (state: TAppState): TGameState['isGameOver'] => state.game.isGameOver;
export const gameIsSoundOnSelector = (state: TAppState): TGameState['isSoundOn'] => state.game.isSoundOn;
export const gameLastScoreSelector = (state: TAppState): TGameState['lastScore'] => state.game.lastScore;
export const gameSkillLevelSelector = (state: TAppState): TGameState['skillLevel'] => state.game.skillLevel;
