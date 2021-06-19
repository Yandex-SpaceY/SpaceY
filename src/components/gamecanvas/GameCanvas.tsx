import React, { FC, useEffect, useRef, useState, ReactElement } from 'react';
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const gameMain = new GameMain(canvas as HTMLCanvasElement,
      getCollisions, getScore, getGameOverStatus, getGamePauseStatus);

    return () => {
      gameMain.unsetControlsandSubscriptions();
    };
  }, []);

  return (
    <>
      <div>Is Game Over: {isGameOver.toString()}</div>
      <div>Is Game Paused: {isGamePaused.toString()}</div>
      <div>Collisions: {collisions}</div>
      <div>Score: {score}</div>
      <canvas ref={canvasRef} className={cn('game-canvas', className)} width={375} height={667}/>
    </>
  );

};

export default GameCanvas;
