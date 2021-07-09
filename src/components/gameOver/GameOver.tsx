import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import { GAME_OPTIONS } from 'constants/gameConstants';

import './gameOver.scss';

interface IGameOver {
  score?: number;
  isShown?: boolean;
  className?: string;
}

const GameOver: FC<IGameOver> = ({ isShown = false, score = 0, className }): ReactElement => {
  return (
    <div className={cn('game-over', className, (!isShown && 'hidden'))}>
      <h1 className={'game-over-title'}>{GAME_OPTIONS.GAME_OVER_TITLE}</h1>
      <h4 className={'game-over-score-title'}>{GAME_OPTIONS.GAME_OVER_SCORE_TITLE}</h4>
      <div className={'game-over-score'}>{score}</div>
    </div>

  );
};

export default GameOver;
