import React, { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from 'components';
import { fakeOnChange, fakeOnClick } from 'utils';
import { GAME_NAME, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

import './login.scss';

const Login: FC = (): ReactElement => {
  const [state] = useState({
    email: 'email@email.com',
    password: '123456'
  });

  return (
    <div className='main login'>
      <div className='content-wrapper'>
        <h1>{GAME_NAME}</h1>
        <form className='content'>
          <h2>{PAGE_NAMES.LOGIN}</h2>
          <div className='input-wrapper'>
            <Input value={state.email} name='email' onChange={fakeOnChange} title='e-mail' type='email' />
          </div>
          <div className='input-wrapper'>
            <Input value={state.password} name='password' title='password' onChange={fakeOnChange} type='password' />
          </div>

          <Button onClick={fakeOnClick}>GET IN</Button>
          <Link to={ROUTE_CONSTANTS.SIGNUP} className='link'>
            {LINK_TEXTS.SIGNUP}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
