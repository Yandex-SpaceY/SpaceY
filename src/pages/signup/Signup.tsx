import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { signup } from 'api/authApi';
import { Button, Input } from 'components';
import {
  checkEmail,
  checkFieldNotEmpty,
  checkPassword,
  checkPhone,
  checkButtonDisable,
} from 'utils';
import { GAME_NAME, PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_SIGNUP_STATE, SIGNUP_KEYS, SIGNUP_TYPE } from 'constants/defaultStates';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

const Signup: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const [ userState, setUserState ] = useState<SIGNUP_TYPE>(DEFAULT_SIGNUP_STATE);
  const [ disabled, setDisabled ] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as SIGNUP_KEYS;

    setUserState({ ...userState, [name]: value });
  };

  useEffect(() => {
    const newDisable = checkButtonDisable();

    setDisabled(newDisable);
  }, [userState]);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup(userState);

      history.push(ROUTE_CONSTANTS.GAME);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <h1>{GAME_NAME}</h1>
        <form className='content' onSubmit={onSubmitHandler} >
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
          <div className='input-wrapper'>
            <Input
              value={userState.first_name}
              name='first_name'
              title='first name'
              onChange={onChange}
              errorText={checkFieldNotEmpty(userState.first_name)}
            />
            <Input
              value={userState.second_name}
              name='second_name'
              title='second name'
              onChange={onChange}
              errorText={checkFieldNotEmpty(userState.second_name)}
            />
          </div>
          <div className='input-wrapper'>
            <Input
              value={userState.email}
              name='email'
              onChange={onChange}
              title='e-mail'
              type='email'
              errorText={checkEmail(userState.email)}
            />
            <Input
              value={userState.login}
              name='login'
              title='login'
              onChange={onChange}
              errorText={checkFieldNotEmpty(userState.login)}
            />
          </div>
          <div className='input-wrapper'>
            <Input
              value={userState.phone}
              name='phone'
              title='phone'
              onChange={onChange}
              errorText={checkPhone(userState.phone)}
            />
            <Input
              value={userState.password}
              name='password'
              title='password'
              onChange={onChange}
              type='password'
              errorText={checkPassword(userState.password)}
            />
          </div>
          <div className='button-wrapper'>
            <Button type='submit' disabled={disabled}>{BUTTON_TEXTS.SIGNUP}</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.LOGIN} className='link'>{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.GAME} className='link'>{LINK_TEXTS.GAME}</Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
