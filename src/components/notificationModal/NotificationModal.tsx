import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { userAlertSelector } from 'store/user/selectors';
import { setAlert } from 'store/user/actions';
import { ALERT_TYPE, DEFAULT_ALERT_STATE } from 'constants/defaultStates';

import './notificationModal.scss';

const NotificationModal: FC = () => {
  const [ state, setState ] = useState<ALERT_TYPE>(DEFAULT_ALERT_STATE);
  const alert = useSelector(userAlertSelector);
  const dispatch = useDispatch();
  const { type, title, message } = state;

  useEffect(() => {
    if (alert) {
      setState(prevState => ({ ...prevState, ...alert }));
      setTimeout(() => dispatch(setAlert(null)), state.timeout);
    }
  }, [alert]);

  return alert ? (
    <div className={cn('notification-wrapper', type)}>
      <div className='notification-title'>{title}</div>
      <div className='notification-message'>{message}</div>
    </div>
  ) : null;
};

export default NotificationModal;
