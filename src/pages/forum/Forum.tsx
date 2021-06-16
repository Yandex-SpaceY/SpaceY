import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Forum: FC = (): ReactElement => <Link to={routeConstants.DASHBOARD}>Main page</Link>;

export default Forum;
