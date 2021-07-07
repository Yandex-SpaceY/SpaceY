import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { changeProfile, changeProfileAvatar } from 'api/userApi';
import { Avatar, Button, Input } from 'components';
import {
  checkEmail,
  checkFieldNotEmpty,
  checkPhone,
  checkButtonDisable,
  getImageUrl,
} from 'utils';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { DEFAULT_PROFILE_STATE, PROFILE_KEYS, PROFILE_TYPE } from 'constants/defaultStates';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { setUserData } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';

const ProfileEdit: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector(userUserDataSelector) as PROFILE_TYPE;

  const [ userState, setUserState ] = useState<PROFILE_TYPE>(DEFAULT_PROFILE_STATE);
  const [ disabled, setDisabled ] = useState<boolean>(true);
  const [ avatar, setAvatar ] = useState<string>('');
  const [ avatarError, setAvatarError ] = useState<string>('');

  useEffect(() => {
    if (Object.keys(userData)) {
      setUserState(userData);
      setAvatar(getImageUrl(userData.avatar));
    }
  }, [userData]);

  useEffect(() => {
    const newDisable = checkButtonDisable();

    setDisabled(newDisable);
  }, [userState]);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await changeProfile(userState);
      response && dispatch(setUserData(response.data));

      history.push(ROUTE_CONSTANTS.PROFILE);
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const name = e.target.name as PROFILE_KEYS;

    setUserState({ ...userState, [name]: value });
  };

  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', event.currentTarget!.files![0]);

    try {
      const response = await changeProfileAvatar(formData);

      if (response) {
        const newAvatar = response.data?.avatar;
        setAvatar(getImageUrl(newAvatar));
        dispatch(setUserData(response.data));
        setAvatarError('');
      }
    } catch (err) {
      setAvatarError(ERROR_CONSTANTS.CHOOSE_ANOTHER_FILE);
    }
  };

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <form onSubmit={onSubmitHandler} className='content'>
          <h2>{PAGE_NAMES.PROFILE_EDIT}</h2>
          <Avatar errorText={avatarError} src={avatar} onChange={changeAvatar}/>
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
              value={userState.display_name || ''}
              name='display_name'
              title='display name'
              onChange={onChange}
              errorText={checkFieldNotEmpty(userState.display_name)}
            />
            <Input
              value={userState.phone}
              name='phone'
              title='phone'
              onChange={onChange}
              errorText={checkPhone(userState.phone)}
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

export default withRouter(ProfileEdit);
