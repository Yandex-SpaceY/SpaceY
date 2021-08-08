import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import './notificationModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userAlertSelector } from 'store/user/selectors';
import { ALERT_TYPE, DEFAULT_ALERT_STATE } from 'constants/defaultStates';
import { setAlert } from 'store/user/actions';

interface INotificationProps {
  type?: string;
  text?: string;
  title?: string;
  timeout?: number;
}

const NotificationModal: FC<INotificationProps> = () => {
  const [state, setState] = useState<ALERT_TYPE>(DEFAULT_ALERT_STATE);
  const alert = useSelector(userAlertSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      const newState = { ...state, ...alert };
      setState(newState);
      setTimeout(() => dispatch(setAlert(null)), state.timeout);
    }
  }, [alert]);

  const { type, title, text } = state;

  return alert ? (
    <div className={cn('notification-wrapper', type)}>
      <div className='notification-title'>{title}</div>
      <div className='notification-text'>{text}</div>
    </div>
  ) : null;
};

export default NotificationModal;