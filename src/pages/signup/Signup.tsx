import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { signup } from 'api/authApi';
import { Button, Input } from 'components';
import {
  checkEmail,
  checkFieldNotEmpty,
  checkPassword,
  checkPhone,
  buttonDisabler,
} from 'utils';
import { DEFAULT_USER_STATE, GAME_NAME, LINK_TEXTS, PAGE_NAMES, userKeys, userType } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

const Signup: FC = (): ReactElement => {
  const [ state, setState ] = useState<userType>(DEFAULT_USER_STATE);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as userKeys;
    const newState = Object.assign({}, state);
    newState[name] = value;
    setState(newState);
  };

  useEffect(() => {
    buttonDisabler();
  }, [state]);

  const signupHandler = async () => {
    try {
      await signup(state);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <h1>{GAME_NAME}</h1>
        <form className='content'>
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
          <div className='input-wrapper'>
            <Input value={state.first_name} name='first_name' title='first name' onChange={onChange} errorText={checkFieldNotEmpty(state.first_name)} />
            <Input value={state.second_name} name='second_name' title='second name' onChange={onChange} errorText={checkFieldNotEmpty(state.second_name)} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.email} name='email' onChange={onChange} title='e-mail' type='email' errorText={checkEmail(state.email)} />
            <Input value={state.login} name='login' title='login' onChange={onChange} errorText={checkFieldNotEmpty(state.login)} />
          </div>
          <div className='input-wrapper'>
            <Input value={state.phone} name='phone' title='phone' onChange={onChange} errorText={checkPhone(state.phone)} />
            <Input value={state.password} name='password' title='password' onChange={onChange} type='password' errorText={checkPassword(state.password)} />
          </div>
          <div className='button-wrapper'>
            <Button onClick={signupHandler}>{BUTTON_TEXTS.SIGNUP}</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.LOGIN} className='link'>{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>{LINK_TEXTS.DASHBOARD}</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
