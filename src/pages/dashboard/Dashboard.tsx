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
    <div className="footer-item">
      <Link to="/leaderboard" className="menu-item">
        {PAGES_NAME.LEADERBOARD}
      </Link>
    </div>
  </div>
);

export default Dashboard;

