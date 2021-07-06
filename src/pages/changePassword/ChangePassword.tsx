import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { changePassword } from 'api/userApi';
import { Button, Input } from 'components';
import {
  checkFieldNotEmpty,
  checkPassword,
  checkButtonDisable,
} from 'utils';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_PASSWORD_STATE, PASSWORD_KEYS, PASSWORD_TYPE } from 'constants/defaultStates';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

import './changePassword.scss';

const ChangePassword: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const [ passwordsState, setPasswordsState ] = useState<PASSWORD_TYPE>(DEFAULT_PASSWORD_STATE);
  const [ disabled, setDisabled ] = useState<boolean>(true);

  useEffect(() => {
    const newDisable = checkButtonDisable();

    setDisabled(newDisable);
  }, [passwordsState]);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwordsState);

      history.push(ROUTE_CONSTANTS.PROFILE);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as PASSWORD_KEYS;

    setPasswordsState({ ...passwordsState, [name]: value });
  };

  return (
    <div className='main passwords'>
      <div className='content-wrapper'>
        <form onSubmit={onSubmitHandler} className='content'>
          <h2>{PAGE_NAMES.CHANGE_PASSWORD}</h2>
          <div className='input-wrapper'>
            <Input
              value={passwordsState.oldPassword}
              type='password'
              name='oldPassword'
              title='current password'
              onChange={onChange}
              errorText={checkFieldNotEmpty(passwordsState.oldPassword)}
            />
          </div>

          <div className='input-wrapper'>
            <Input
              value={passwordsState.newPassword}
              type='password'
              name='newPassword'
              title='new password'
              onChange={onChange}
              errorText={checkPassword(passwordsState.newPassword)}
            />
          </div>

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

export default withRouter(ChangePassword);
