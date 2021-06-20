import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Profile: FC = (): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.PROFILE_EDIT}>Edit my info</Link>
    <Link to={ROUTE_CONSTANTS.DASHBOARD}>Main page</Link>
  </>
);

export default Profile;
