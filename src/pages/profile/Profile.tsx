import React, { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { logout } from 'api/authApi';
import { Avatar, Button, Input, PageMeta } from 'components';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ALERT_TEXTS } from 'constants/alertConstants';
import { clearUserData, getUserDataFromServer, setAlert } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';
import { getImageUrl } from 'utils';

import './profile.scss';

const Profile: FC<RouteComponentProps> = ({ history }): ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector(userUserDataSelector);

  const logoutAndRedirect = async () => {
    try {
      await logout();
      dispatch(getUserDataFromServer());
      dispatch(clearUserData());
      history.push(ROUTE_CONSTANTS.LOGIN);
    } catch (err) {
      const text = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.PROFILE,
        text,
        type: 'error'
      };
      dispatch(setAlert(alert));
    }
  };

  return (
    <div className='main'>
      <PageMeta title={PAGE_NAMES.PROFILE} />
      <div className='content-wrapper double'>
        <form className='content'>
          <h2>{PAGE_NAMES.PROFILE}</h2>
          <Avatar src={getImageUrl(userData.avatar)} />

          <div className='input-wrapper'>
            <Input value={userData.first_name} name='first_name' title='first name' />
            <Input value={userData.second_name} name='second_name' title='second name' />
          </div>
          <div className='input-wrapper'>
            <Input value={userData.email} name='email' title='e-mail' type='email' />
            <Input value={userData.login} name='login' title='login' />
          </div>
          <div className='input-wrapper'>
            <Input value={userData.display_name || ''} name='display_name' title='display name' />
            <Input value={userData.phone} name='phone' title='phone' />
          </div>

          <Button onClick={logoutAndRedirect}>{BUTTON_TEXTS.LOGOUT}</Button>

          <div className='links-together'>
            <Link to={ROUTE_CONSTANTS.PROFILE_EDIT} className='link'>
              {LINK_TEXTS.PROFILE_EDIT}
            </Link>
            <span className='link link-disabled'>&nbsp;/&nbsp;</span>
            <Link to={ROUTE_CONSTANTS.CHANGE_PASSWORD} className='link'>
              {LINK_TEXTS.CHANGE_PASSWORD}
            </Link>
          </div>

          <Link to={ROUTE_CONSTANTS.GAME} className='link'>
            {LINK_TEXTS.GAME}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Profile);
