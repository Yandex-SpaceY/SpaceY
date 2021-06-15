import React from 'react';
import { Link } from 'react-router-dom';

import { GAME_NAME, MENU_ITEMS, PAGES_NAME } from 'constants/commonConstants';
import './dashboard.scss';

const Dashboard = (): React.ReactElement => (
  <div className="menu">
    <div className="content-wrapper">
      <h1>{GAME_NAME}</h1>
      <div className="content">
        {MENU_ITEMS.map(item => (
          <Link key={item.title} className="menu-item" to={item.route}>
            {item.title}
          </Link>
        ))
        }
      </div>
    </div>
    <h2 className="footer-item">{PAGES_NAME.LEADERBOARD}</h2>
  </div>
);

export default Dashboard;

