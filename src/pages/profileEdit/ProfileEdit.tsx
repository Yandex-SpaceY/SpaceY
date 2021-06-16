import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const ProfileEdit: FC = (): ReactElement => (
  <>
    <Link to={routeConstants.PROFILE}>See my profile</Link>
    <Link to={routeConstants.DASHBOARD}>Main page</Link>
  </>
);

export default ProfileEdit;
