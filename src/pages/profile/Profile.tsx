import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import Input from 'components/input/Input';
import { DEFAULT_USER_STATE, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { getUserInfo } from 'api/authApi';

const Profile: FC = (): ReactElement => {
  const [ state, setState ] = useState(DEFAULT_USER_STATE);

  useEffect(() => {
    getUserInfo().then((res: AxiosResponse) => {
      setState(res.data);
    });
  }, []);

  return (
    <div className="main">
      <div className="content-wrapper double">
        <form className="content">
          <h2>{PAGE_NAMES.PROFILE}</h2>
          <div className="profile-image" />
          <div className="input-wrapper">
            <Input value={state.first_name} name="first_name" title="first name" />
            <Input value={state.second_name} name="second_name" title="second name" />
          </div>
          <div className="input-wrapper">
            <Input value={state.email} name="email" title="e-mail" type="email" />
            <Input value={state.login} name="login" title="login" />
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
