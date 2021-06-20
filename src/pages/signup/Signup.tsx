import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Signup: FC = (): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.LOGIN}>I have an account</Link>
    <Link to={ROUTE_CONSTANTS.DASHBOARD}>Create an account and enter the game</Link>
  </>
);

export default Signup;
