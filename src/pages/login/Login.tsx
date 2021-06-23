import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { signin } from 'api/authApi';
import { buttonDisabler, checkFieldNotEmpty, checkPassword } from 'utils';
import { Button, Input } from 'components';
import { DEFAULT_LOGIN_STATE, GAME_NAME, LINK_TEXTS, loginKeys, loginType, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

import './login.scss';

const Login: FC = (): ReactElement => {
  const [ state, setState ] = useState<loginType>(DEFAULT_LOGIN_STATE);

  useEffect(() => {
    buttonDisabler();
  }, [state]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as loginKeys;
    const newState = Object.assign({}, state);
    newState[name] = value;
    setState(newState);
  };

  const loginHandler = async () => {
    try {
      await signin(state);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  return (
    <div className='main login'>
      <div className='content-wrapper'>
        <h1>{GAME_NAME}</h1>
        <form className='content'>
          <h2>{PAGE_NAMES.LOGIN}</h2>
          <div className='input-wrapper'>
            <Input value={state.login} name='login' onChange={onChange} title='login' errorText={checkFieldNotEmpty(state.login)}/>
          </div>
          <div className='input-wrapper'>
            <Input value={state.password} name='password' title='password' onChange={onChange} errorText={checkPassword(state.password)} type='password' />
          </div>
          <Button onClick={loginHandler}>{BUTTON_TEXTS.SIGNIN}</Button>
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
