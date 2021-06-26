import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import cn from 'classnames';

import GameMain from '../../game/gamemain';
import { MENU_ACTIONS } from 'constants/menuConstants';

interface IGameCanvas {
  className?: string;
  toggleMenu?: () => void;
  menuAction?: string | null;
  resetMenuAction?: () => void;
}

const GameCanvas: FC<IGameCanvas> = ({ className, toggleMenu, menuAction, resetMenuAction }): ReactElement => {
  const isFirstRun = useRef<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ collisions, setCollisions ] = useState<number>(0);
  const [ score, setScore ] = useState<number>(0);
  const [ isGameOver, setIsGameOverStatus ] = useState<boolean>(false);
  const [ isGamePaused, setIsGamePauseStatus ] = useState<boolean>(true);
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

    toggleMenu && toggleMenu();

  }, [isGamePaused]);

  useEffect(() => {
    switch (menuAction) {
      case MENU_ACTIONS.GAME_RESUME:
        resumeGame();
        break;
      case MENU_ACTIONS.GAME_RESTART:
      case MENU_ACTIONS.GAME_START:
        restartGame();
        break;
      default:
        break;
    }

    resetMenuAction && resetMenuAction();
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
