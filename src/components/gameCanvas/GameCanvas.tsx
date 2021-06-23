import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import cn from 'classnames';

import GameMain from '../../game/gamemain';
import { MENU_ACTIONS } from 'constants/commonConstants';

interface IGameCanvas {
  className?: string;
  toggleMenu?: () => void;
  menuAction?: string | null;
  resetMenuAction?: () => void;
}

const GameCanvas: FC<IGameCanvas> = ({ className, toggleMenu, menuAction, resetMenuAction }): ReactElement => {
  const isFirstRun = useRef(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ collisions, setCollisions ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ isGameOver, setIsGameOverStatus ] = useState(false);
  const [ isGamePaused, setIsGamePauseStatus ] = useState(true);
  let gameMain: GameMain;

  useEffect(() => {
    const canvas = canvasRef.current;
    gameMain = new GameMain(
      canvas as HTMLCanvasElement,
      setCollisions,
      setScore,
      setIsGameOverStatus,
      setIsGamePauseStatus
    );

    gameMain.togglePauseStatus();

    return () => {
      gameMain.unsetControlsAndSubscriptions();
    };
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;

      return;
    }

    if (toggleMenu) {
      toggleMenu();
    }

  }, [isGamePaused]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;

      return;
    }

    switch (menuAction) {
    case MENU_ACTIONS.GAME_RESUME:
      resumeGame();
      if (resetMenuAction) {
        resetMenuAction();
      }
      break;
    case MENU_ACTIONS.GAME_RESTART:
      restartGame();
      if (resetMenuAction) {
        resetMenuAction();
      }
      break;
    case MENU_ACTIONS.GAME_START:
      restartGame();
      if (resetMenuAction) {
        resetMenuAction();
      }
      break;
    default:
      break;

    }
  }, [menuAction]);

  const resumeGame = useCallback(() => {
    gameMain.togglePauseStatus();
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

      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={375} height={667}/>
    </>
  );
};

export default GameCanvas;
