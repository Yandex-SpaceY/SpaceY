import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserInfo } from 'api/authApi';
import Input from 'components/input/Input';
import { DEFAULT_USER_STATE, PAGE_NAMES } from 'constants/commonConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

const Profile: FC = (): ReactElement => {
  const [ userState, setUserState ] = useState(DEFAULT_USER_STATE);

  const getUserData = async () => {
    try {
      const res = await getUserInfo();
      setUserState(res.data);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <form className='content'>
          <h2>{PAGE_NAMES.PROFILE}</h2>
          <div className='profile-image' />
          <div className='input-wrapper'>
            <Input value={userState.first_name} name='first_name' title='first name' />
            <Input value={userState.second_name} name='second_name' title='second name' />
          </div>
          <div className='input-wrapper'>
            <Input value={userState.email} name='email' title='e-mail' type='email' />
            <Input value={userState.login} name='login' title='login' />
          </div>
          <div className='input-wrapper'>
            <Input value={userState.phone} name='phone' title='phone' />
            <Input value={userState.password} name='password' title='password' type='password' />
          </div>
          <Link to={ROUTE_CONSTANTS.PROFILE_EDIT} className='link'>
            {LINK_TEXTS.PROFILE_EDIT}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
