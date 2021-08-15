import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import GameMain from 'game/GameMain';
import {
  setIsGameStarted,
  setIsGamePaused,
  setIsGameOver,
  setLastScore,
  setIsSoundOn,
} from 'store/game/actions';
import {
  gameIsGameStartedSelector,
  gameIsGamePausedSelector,
  gameIsGameOverSelector,
} from 'store/game/selectors';
import { TUserSettings } from 'store/types';
import { updateUserSettingsToServer } from 'store/user/actions';
import { GameHUD } from 'components';
import { GAME_OPTIONS, THEME_OPTIONS } from 'constants/gameConstants';
import { MENU_ACTIONS } from 'constants/menuConstants';
import { useWindowSize } from 'hooks';

import './gameCanvas.scss';

interface IGameCanvas {
  className?: string;
  menuAction?: string | null;
  resetMenuAction?: () => void;
  settings: TUserSettings;
  isSoundOn: boolean;
}

const GameCanvas: FC<IGameCanvas> = (props): ReactElement => {
  const { className, isSoundOn, settings, menuAction, resetMenuAction } = props;
  const dispatch = useDispatch();

  const { vibration } = settings;
  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);
  const isGameOver = useSelector(gameIsGameOverSelector);

  const setIsGameStartedStatus = (isGameStarted: boolean) => {
    dispatch(setIsGameStarted(isGameStarted));
  };
  const setIsGamePauseStatus = (isGamePaused: boolean) => {
    dispatch(setIsGamePaused(isGamePaused));
  };
  const setIsGameOverStatus = (isGameOver: boolean) => {
    dispatch(setIsGameOver(isGameOver));
  };
  const setLastScoreState = (lastScore: number) => {
    dispatch(setLastScore(lastScore));
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const windowSize = useWindowSize();

  const [ canvasHeight, setCanvasHeight ] = useState<number | undefined>(windowSize.height);
  const [ hull, setHull ] = useState<number>(0);
  const [ score, setScore ] = useState<number>(0);

  let gameMain: GameMain;

  useEffect(() => {
    const canvas = canvasRef.current;
    gameMain = new GameMain({
      canvas: canvas as HTMLCanvasElement,
      setHull,
      setScore,
      setGameOverStatus: setIsGameOverStatus,
      setGamePauseStatus: setIsGamePauseStatus
    });

    gameMain.togglePauseStatus();

    return () => {
      gameMain.clear();
    };
  }, []);

  useEffect(() => {
    if (canvasHeight !== windowSize.height) {
      setCanvasHeight(windowSize.height);
      reinitGame();
    }
  }, [windowSize]);

  useEffect(() => {
    switch (menuAction) {
      case MENU_ACTIONS.GAME_RESUME:
        resumeGame();
        setIsGamePauseStatus(false);
        break;
      case MENU_ACTIONS.GAME_RESTART:
      case MENU_ACTIONS.GAME_START:
        restartGame();
        setIsGamePauseStatus(false);
        setIsGameStartedStatus(true);
        break;
      case MENU_ACTIONS.SHOW_MAIN_MENU:
        setIsGamePauseStatus(true);
        setPauseStatus(true);
        setIsGameOverStatus(false);
        setIsGameStartedStatus(false);
        break;
      case MENU_ACTIONS.GAME_SOUND_SWITCH:
        dispatch(setIsSoundOn(!isSoundOn));
        dispatch(updateUserSettingsToServer({ ...settings, sound: !isSoundOn }));
        break;
      case MENU_ACTIONS.GAME_VIBRATION_SWITCH:
        dispatch(updateUserSettingsToServer({ ...settings, vibration: !vibration }));
        break;
      case MENU_ACTIONS.GAME_THEME_SWITCH:
      {
        const { theme } = settings;
        const nextTheme = theme === THEME_OPTIONS.PRIMARY ? THEME_OPTIONS.SECONDARY : THEME_OPTIONS.PRIMARY;
        dispatch(updateUserSettingsToServer({ ...settings, theme: nextTheme }));
        break;
      }
      default:
        break;
    }

    resetMenuAction && resetMenuAction();
  }, [menuAction]);

  useEffect(() => {
    if (isGameOver) {
      setLastScoreState(score);
    }
  }, [isGameOver]);

  useEffect(() => {
    setGameSoundStatus(isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    setGameVibrationStatus(vibration);
  }, [vibration]);

  useEffect(() => {
    if (isGameStarted) {
      setPauseStatus(isGamePaused);
    }
  }, [isGamePaused]);

  const resumeGame = useCallback(() => {
    gameMain.setPauseStatus(true);
  }, []);

  const setPauseStatus = useCallback((status: boolean) => {
    gameMain.setPauseStatus(status);
  }, []);

  const restartGame = useCallback(() => {
    gameMain.init();
    gameMain.setPauseStatus(false);
  }, []);

  const reinitGame = useCallback(() => {
    gameMain.init();
  }, []);

  const setGameSoundStatus = useCallback((status: boolean) => {
    gameMain.setSoundStatus(status);
  }, []);

  const setGameVibrationStatus = useCallback((status: boolean) => {
    gameMain.setVibrationStatus(status);
  }, []);

  return (
    <div className='game-canvas-wrapper'>
      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={GAME_OPTIONS.GAME_AREA_WIDTH} height={canvasHeight} />
      <GameHUD hullStrength={hull} distance={score} />
    </div>

  );
};

export default GameCanvas;
