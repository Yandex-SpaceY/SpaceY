import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Dashboard: FC = (): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.LEADERBOARD}>Best players</Link>
    <Link to={ROUTE_CONSTANTS.GAME}>Start</Link>
    <Link to={ROUTE_CONSTANTS.PROFILE}>My profile</Link>
    <Link to={ROUTE_CONSTANTS.FORUM}>Forum</Link>
  </>
);

export default Dashboard;
