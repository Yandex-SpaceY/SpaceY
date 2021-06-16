import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Leaderboard: FC = (): ReactElement => <Link to={routeConstants.DASHBOARD}>Go to dashboard</Link>;

export default Leaderboard;
