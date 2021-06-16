import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Signup: FC = (): ReactElement => (
  <>
    <Link to={routeConstants.LOGIN}>I have an account</Link>
    <Link to={routeConstants.DASHBOARD}>Create an account and enter the game</Link>
  </>
);

export default Signup;
