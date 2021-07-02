import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { signin } from 'api/authApi';
import { checkButtonDisable, checkFieldNotEmpty, checkPassword } from 'utils';
import { Button, Input } from 'components';
import { DEFAULT_LOGIN_STATE, GAME_NAME, LOGIN_KEYS, LOGIN_TYPE, PAGE_NAMES } from 'constants/commonConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

import './login.scss';

const Login: FC = (): ReactElement => {
  const [loginState, setLoginState] = useState<LOGIN_TYPE>(DEFAULT_LOGIN_STATE);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const newDisable = checkButtonDisable();
    setDisabled(newDisable);
  }, [loginState]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as LOGIN_KEYS;
    setLoginState(Object.assign(loginState, { [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signin(loginState);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  return (
    <div className='main login'>
      <div className='content-wrapper'>
        <h1>{GAME_NAME}</h1>
        <form className='content' onSubmit={onSubmitHandler}>
          <h2>{PAGE_NAMES.LOGIN}</h2>
          <div className='input-wrapper'>
            <Input
              value={loginState.login}
              name='login'
              onChange={onChange}
              title='login'
              errorText={checkFieldNotEmpty(loginState.login)}
            />
          </div>
          <div className='input-wrapper'>
            <Input
              value={loginState.password}
              name='password'
              title='password'
              onChange={onChange}
              errorText={checkPassword(loginState.password)}
              type='password'
            />
          </div>
          <Button disabled={disabled} type='submit'>{BUTTON_TEXTS.SIGNIN}</Button>
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
