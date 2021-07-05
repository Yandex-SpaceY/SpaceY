import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import GameMain from '../../game/gamemain';
import { setIsGameStarted, setIsGamePaused, setIsGameOver, setLastScore } from 'store/game/actions';
import { gameIsGameStartedSelector, gameIsGamePausedSelector, gameIsGameOverSelector } from 'store/game/selectors';
import { MENU_ACTIONS } from 'constants/menuConstants';
import { GAME_OPTIONS } from 'constants/gameConstants';

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

  const [ collisions, setCollisions ] = useState<number>(0);
  const [ score, setScore ] = useState<number>(0);

  let gameMain: GameMain;

  useEffect(() => {
    const canvas = canvasRef.current;
    gameMain = new GameMain({
      canvas: canvas as HTMLCanvasElement,
      setCollisions: setCollisions,
      setScore: setScore,
      setGameOverStatus: setIsGameOverStatus,
      setGamePauseStatus: setIsGamePauseStatus
    });

    gameMain.togglePauseStatus();

    return () => {
      //gameMain.unsetControlsAndSubscriptions();
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
    gameMain.togglePauseStatus();
  }, []);

  return (
    <>
      <div style={{
        position: 'absolute',
        color: '#fff',
        top: 0,
        left: 0
      }}>
        <div>Is Game Over: {isGameOver.toString()}</div>
        <div>Is Game Paused: {isGamePaused.toString()}</div>
        <div>Collisions: {collisions}</div>
        <div>Score: {score}</div>
      </div>
      <div
        style={{
          display: isGameOver ? 'block' : 'none',
          position: 'absolute',
          color: '#fff',
        }}
      >
        Game Over
      </div>

      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={GAME_OPTIONS.CANVAS_WIDTH} height={GAME_OPTIONS.CANVAS_HEIGHT}/>
    </>
  );
};

export default GameCanvas;
