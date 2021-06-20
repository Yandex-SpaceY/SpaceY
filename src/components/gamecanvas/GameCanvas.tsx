import React, { FC, useEffect, useCallback, useRef, useState, ReactElement } from 'react';
import cn from 'classnames';

import GameMain from '../../game/gamemain';

interface IGameCanvas {
  className?: string;
}

const GameCanvas: FC<IGameCanvas> = ({ className }): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ collisions, getCollisions ] = useState(0);
  const [ score, getScore ] = useState(0);
  const [ isGameOver, getGameOverStatus ] = useState(false);
  const [ isGamePaused, getGamePauseStatus ] = useState(false);
  let gameMain: GameMain;

  useEffect(() => {
    const canvas = canvasRef.current;
    gameMain = new GameMain(canvas as HTMLCanvasElement,
      getCollisions, getScore, getGameOverStatus, getGamePauseStatus);

    return () => {
      gameMain.unsetControlsandSubscriptions();
    };
  }, []);

  const handleResumeClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    gameMain.togglePauseStatus();
  }, []);

  const handleRestartClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    gameMain.init();
    gameMain.togglePauseStatus();
  }, []);

  return (
    <>
      <div>Is Game Over: {isGameOver.toString()}</div>
      <div>Is Game Paused: {isGamePaused.toString()}</div>
      <div>Collisions: {collisions}</div>
      <div>Score: {score}</div>
      <div style={{
        display: isGameOver ? 'block' : 'none',
        position: 'absolute',
        color: '#fff' }}>Game Over</div>
      <menu style={{
        display: isGamePaused ? 'block' : 'none',
        position: 'absolute',
        color: '#fff' }}>
        <ul>
          <li><a href="#" onClick={handleResumeClick} style={{ color: '#fff' }}>Resume</a></li>
          <li><a href="#" onClick={handleRestartClick} style={{ color: '#fff' }}>Restart</a></li>
        </ul>
      </menu>
      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={375} height={667}/>
    </>
  );

};

export default GameCanvas;
