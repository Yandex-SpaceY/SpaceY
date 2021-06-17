import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Leaderboard: FC = (): ReactElement => <Link to={ROUTE_CONSTANTS.DASHBOARD}>Go to dashboard</Link>;

export default Leaderboard;
