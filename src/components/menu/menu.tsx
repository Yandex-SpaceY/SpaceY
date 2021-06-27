import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { GAME_NAME } from 'constants/commonConstants';
import { MENU_ITEMS } from 'constants/menuConstants';

import './menu.scss';

export type TMenuItem = {
  title: string;
  route: string | null;
  action: string | null;
}

interface IMenu {
  menuItems?: TMenuItem[];
  isShown?: boolean;
  handleAction?: (action: string) => void;
}

const Menu: FC<IMenu> = ({ menuItems = MENU_ITEMS, isShown = true, handleAction }): ReactElement => {
  return (
    <div className={cn('menu', (!isShown && 'hidden'))}>
      <h1>{GAME_NAME}</h1>
      <div className='menu-items'>
        {
          menuItems.map(({ title, route, action }) => {
            if (route) {
              return (
                <Link key={title} className='menu-item' to={route}>
                  {title}
                </Link>
              );
            } else if (action) {
              return (
                <span key={title} className='menu-item' onClick={() => {
                  if (handleAction) handleAction(action);
                }}>
                  {title}
                </span>
              );
            }
          })
        }
      </div>
    </div>

  );
};

export default Menu;
