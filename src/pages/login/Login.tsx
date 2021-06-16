import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Login: FC = (): ReactElement => (
  <>
    <Link to={routeConstants.DASHBOARD}>Go to dashboard</Link>
    <Link to={routeConstants.SIGNUP}>I want to create an account</Link>
  </>
);

export default Login;
