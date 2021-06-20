import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import GameCanvas from 'components/gameCanvas/GameCanvas';
import { routeConstants } from 'constants/routeConstants';

const Game: FC = (): ReactElement => {
  return (
    <div>
      <GameCanvas></GameCanvas>
      <Link to={routeConstants.DASHBOARD}>Go to dashboard</Link>
    </div>
  );
};

export default Game;
