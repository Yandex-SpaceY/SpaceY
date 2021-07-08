import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import { GAME_OPTIONS } from 'constants/gameConstants';

import './gameOver.scss';

interface IGameOver {
  isShown?: boolean;
}

const GameOver: FC<IGameOver> = ({ isShown = false }): ReactElement => {
  return (
    <div className={cn('game-over', (!isShown && 'hidden'))}>
      <h1>{GAME_OPTIONS.GAME_OVER_TITLE}</h1>
    </div>

  );
};

export default GameOver;
