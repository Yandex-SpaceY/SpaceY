import React, { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import Button from 'components/button/Button';
import Input from 'components/input/Input';
import { fakeOnChange, fakeOnClick } from 'utils';
import { getUserInfo } from 'api/authApi';
import { changeProfile } from 'api/userApi';
import { DEFAULT_USER_STATE, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';

const ProfileEdit: FC = (): ReactElement => {
  const [ state, setState ] = useState(DEFAULT_USER_STATE);

  useEffect(() => {
    getUserInfo()
      .then((res: AxiosResponse) => {
        setState(res.data);
      })
      .catch(err => alert(err.response.data.reason || err.message));
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    changeProfile(state)
      .catch(err => alert(err.response.data.reason || err.message));
  };

  return (
    <div className='main' >
      <div className='content-wrapper double'>
        <form onSubmit={handleSubmit} className='content'>
          <h2>{PAGE_NAMES.PROFILE_EDIT}</h2>
          <div className='profile-image' />
          <div className='input-wrapper'>
            <Input value={state.first_name} name='first_name' title='first name' onChange={fakeOnChange} />
            <Input value={state.second_name} name='second_name' title='second name' onChange={fakeOnChange} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.email} name='email' onChange={fakeOnChange} title='e-mail' type='email' />
            <Input value={state.login} name='login' title='login' onChange={fakeOnChange} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.phone} name='phone' title='phone' onChange={fakeOnChange} />
            <Input value={state.password} name='password' title='password' onChange={fakeOnChange} type='password' />
          </div>
          <div className='button-wrapper'>
            <Button onClick={fakeOnClick} type='submit'>{BUTTON_TEXTS.SAVE}</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.PROFILE} className='link'>
            {LINK_TEXTS.PROFILE}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div >
  );
};

export default ProfileEdit;
