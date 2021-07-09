import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import GameMain from 'game/GameMain';
import {
  setIsGameStarted,
  setIsGamePaused,
  setIsGameOver,
  setLastScore,
  setIsSoundOn
} from 'store/game/actions';
import {
  gameIsGameStartedSelector,
  gameIsGamePausedSelector,
  gameIsGameOverSelector,
  gameIsSoundOnSelector
} from 'store/game/selectors';
import { GameHUD } from 'components';
import { MENU_ACTIONS } from 'constants/menuConstants';
import { GAME_OPTIONS } from 'constants/gameConstants';

import './gameCanvas.scss';

interface IGameCanvas {
  className?: string;
  menuAction?: string | null;
  resetMenuAction?: () => void;
}

const GameCanvas: FC<IGameCanvas> = ({ className, menuAction, resetMenuAction }): ReactElement => {
  const dispatch = useDispatch();

  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);
  const isGameOver = useSelector(gameIsGameOverSelector);
  const isSoundOn = useSelector(gameIsSoundOnSelector);

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
      gameMain.unsetControlsAndSubscriptions();
    };
  }, []);

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
        break;
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

  const setGameSoundStatus = useCallback((status: boolean) => {
    gameMain.setSoundStatus(status);
  }, []);

  return (
    <div className='game-canvas-wrapper'>
      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={GAME_OPTIONS.CANVAS_WIDTH} height={GAME_OPTIONS.CANVAS_HEIGHT}/>
      <GameHUD hullStrength={hull} distance={score} />
    </div>

  );
};

export default GameCanvas;
