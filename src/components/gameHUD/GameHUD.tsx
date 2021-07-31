import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import { GAME_OPTIONS } from 'constants/gameConstants';

import './gameHUD.scss';

interface IGameHUD {
  hullStrength: number;
  distance: number;
  className?: string;
}

const Button: FC<IGameHUD> = ({ hullStrength, distance, className }): ReactElement => (
  <div className={cn('game-hud', className)}>
    <ul>
      <li className={cn('game-hud-line', 'game-hud-strength', (hullStrength < 35 && 'danger'))}>
        <span className='game-hud-label'>{GAME_OPTIONS.HULL_STRENGTH_LABLE}</span>
        {hullStrength}
      </li>
      <li className='game-hud-line game-hud-distance'>
        <span className='game-hud-label'>{GAME_OPTIONS.DISTANCE_LABLE}</span>
        {distance}
      </li>
    </ul>
  </div>
);

export default Button;
