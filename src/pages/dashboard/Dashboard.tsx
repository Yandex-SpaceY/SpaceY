import React, { FC, ReactElement } from 'react';

import { Menu } from 'components';

import './dashboard.scss';

const Dashboard: FC = (): ReactElement => (
  <div className='main dashboard'>
    <div className='content-wrapper'>
      <Menu />
    </div>
  </div>
);

export default Dashboard;

