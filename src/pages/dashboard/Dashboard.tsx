import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Dashboard: FC = (): ReactElement => (
  <>
    <Link to={routeConstants.LEADERBOARD}>Best players</Link>
    <Link to={routeConstants.GAME}>Start</Link>
    <Link to={routeConstants.PROFILE}>My profile</Link>
    <Link to={routeConstants.FORUM}>Forum</Link>
  </>
);

export default Dashboard;
