import React, { FC, useEffect, useRef, ReactElement } from 'react';
import cn from 'classnames';

import GameMain from '../../game/gamemain';

interface IGameCanvas {
  className?: string;
}

const GameCanvas: FC<IGameCanvas> = ({ className }): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    new GameMain(canvas as HTMLCanvasElement);
  }, []);

  return (
    <canvas ref={canvasRef} className={cn('one-button', className)} width={375} height={667}/>
  );

};

export default GameCanvas;
