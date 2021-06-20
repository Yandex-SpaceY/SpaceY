import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { GAME_NAME, MENU_ITEMS } from 'constants/commonConstants';

import './dashboard.scss';

const Dashboard: FC = (): ReactElement => (
  <div className="menu">
    <div className="content-wrapper">
      <h1>{GAME_NAME}</h1>
      <div className="content">
        {MENU_ITEMS.map(({ title, route }) => {
          return (
            <Link key={title} className="menu-item" to={route}>
              {title}
            </Link>
          );
        }
        )}
      </div>
    </div>
  </div>
);

export default Dashboard;

