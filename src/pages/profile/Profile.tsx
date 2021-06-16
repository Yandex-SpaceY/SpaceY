import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

const Profile: FC = (): ReactElement => (
  <>
    <Link to={routeConstants.PROFILE_EDIT}>Edit my info</Link>
    <Link to={routeConstants.DASHBOARD}>Main page</Link>
  </>
);

export default Profile;
