import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import { DEFAULT_USER_STATE, LINK_TEXTS, MOCK_USER_STATE, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Profile: FC = (): ReactElement => {
  const [ state, setState ] = useState(DEFAULT_USER_STATE);

  useEffect(() => setState(MOCK_USER_STATE));

  return (
    <div className="main">
      <div className="content-wrapper double">
        <form className="content">
          <h2>{PAGE_NAMES.PROFILE}</h2>
          <div className="profile-image" />
          <div className="input-wrapper">
            <Input value={state.name} name="name" title="name" />
            <Input value={state.surname} name="surname" title="surname" />
          </div>
          <div className="input-wrapper">
            <Input value={state.email} name="email" title="e-mail" type="email" />
            <Input value={state.codename} name="codename" title="codename" />
          </div>
          <div className="input-wrapper">
            <Input value={state.phone} name="phone" title="phone" />
            <Input value={state.password} name="password" title="password" type="password" />
          </div>
          <Link to={ROUTE_CONSTANTS.PROFILE_EDIT} className="link">
            {LINK_TEXTS.PROFILE_EDIT}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
