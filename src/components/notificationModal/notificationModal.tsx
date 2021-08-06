import React, { FC, ReactElement } from 'react';

import './notificationModal.scss';

interface INotificationModal {
  text?: string
}

const NotificationModal: FC<INotificationModal> = (): ReactElement => (
  <div className='notification-wrapper'>
    <div className='notification-block'>I'm notify</div>
  </div>
);

export default NotificationModal;
