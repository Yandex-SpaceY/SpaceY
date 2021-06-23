import React, { FC, ReactElement } from 'react';

import Menu from 'components/menu/Menu';

import './dashboard.scss';

const Dashboard: FC = (): ReactElement => (
  <div className='menu'>
    <div className='content-wrapper'>
      <Menu />
    </div>
  </div>
);

export default Dashboard;

