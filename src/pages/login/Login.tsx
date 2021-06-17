import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Login: FC = (): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.DASHBOARD}>Go to dashboard</Link>
    <Link to={ROUTE_CONSTANTS.SIGNUP}>I want to create an account</Link>
  </>
);

export default Login;
