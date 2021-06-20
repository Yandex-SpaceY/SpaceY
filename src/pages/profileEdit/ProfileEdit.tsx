import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const ProfileEdit: FC = (): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.PROFILE}>See my profile</Link>
    <Link to={ROUTE_CONSTANTS.DASHBOARD}>Main page</Link>
  </>
);

export default ProfileEdit;
