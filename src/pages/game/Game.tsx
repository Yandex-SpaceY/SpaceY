import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import GameCanvas from 'components/gameCanvas/GameCanvas';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Game: FC = (): ReactElement => {
  return (
    <div>
      <GameCanvas />
      <Link to={ROUTE_CONSTANTS.DASHBOARD}>Go to dashboard</Link>
    </div>
  );
};

export default Game;
