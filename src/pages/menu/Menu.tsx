import { MENU_ITEMS } from 'constants/commonConstants';
import React from 'react';
import './menu.scss';

const Signup = (): React.ReactElement => {
  return (
    <div className="menu">
      <div className="content-wrapper">
        <h1>SpaceY</h1>
        <div className="content">
          {MENU_ITEMS.map((item, i) => {
            const key = `${i}-${item.title}`;

            return (
              <h2 className="menu-item" key={key}>
                {item.title}
              </h2>
            );
          })}
        </div>
      </div>
      <h2 className="footer-item">DEBOARDING</h2>
    </div>
  );
};

export default Signup;
