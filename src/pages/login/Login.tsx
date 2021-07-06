import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { signin } from 'api/authApi';
import { getUserDataFromServer } from 'store/user/actions';
import { userAuthSelector } from 'store/user/selectors';
import { checkButtonDisable, checkFieldNotEmpty, checkPassword } from 'utils';
import { Button, Input } from 'components';
import { GAME_NAME, PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_LOGIN_STATE, LOGIN_KEYS, LOGIN_TYPE } from 'constants/defaultStates';
import { LINK_TEXTS } from 'constants/linkConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

import './login.scss';

const Login: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(userAuthSelector);

  if (isAuthorized === null) {
    dispatch(getUserDataFromServer());
  }

  const [ loginState, setLoginState ] = useState<LOGIN_TYPE>(DEFAULT_LOGIN_STATE);
  const [ disabled, setDisabled ] = useState<boolean>(true);

  useEffect(() => {
    const newDisable = checkButtonDisable();

    setDisabled(newDisable);
  }, [loginState]);

  useEffect(() => {
    if (isAuthorized) {
      history.replace(ROUTE_CONSTANTS.DASHBOARD);
    }
  }, [isAuthorized]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as LOGIN_KEYS;

    setLoginState({ ...loginState, [name]: value });
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signin(loginState);

      history.push(ROUTE_CONSTANTS.DASHBOARD);
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
          <Button disabled={disabled} type='submit' className='button-submit'>{BUTTON_TEXTS.SIGNIN}</Button>
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

export default withRouter(Login);
