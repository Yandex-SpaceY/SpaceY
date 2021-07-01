import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserInfo } from 'api/authApi';
import { changeProfile } from 'api/userApi';
import { Button, Input } from 'components';
import {
  checkEmail,
  checkFieldNotEmpty,
  checkPassword,
  checkPhone,
  checkButtonDisable,
} from 'utils';
import { DEFAULT_USER_STATE, PAGE_NAMES, USER_KEYS, USER_TYPE } from 'constants/commonConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';

const ProfileEdit: FC = (): ReactElement => {
  const [userState, setUserState] = useState<USER_TYPE>(DEFAULT_USER_STATE);
  const [disabled, setDisabled] = useState<boolean>(true);

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

  useEffect(() => {
    const newDisable = checkButtonDisable();
    setDisabled(newDisable);
  }, [userState]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    changeProfile(userState)
      .catch(err => console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as USER_KEYS;
    const newState = Object.assign({}, userState);
    newState[name] = value;
    setUserState(newState);
  };

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <form onSubmit={onSubmitHandler} className='content'>
          <h2>{PAGE_NAMES.PROFILE_EDIT}</h2>
          <div className='profile-image' />
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
          <input type='submit' className='hidden' />
          <div className='button-wrapper'>
            <Button disabled={disabled} type='submit'>{BUTTON_TEXTS.SAVE}</Button>
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
