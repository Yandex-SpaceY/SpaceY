import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import MenuItem from './MenuItem';
import { GAME_NAME } from 'constants/commonConstants';
import { MENU_ITEMS } from 'constants/menuConstants';

import './menu.scss';

export type TMenuItem = {
  title: string;
  route: string | null;
  action: string | null;
  withModifier?: boolean;
  mobileOnly?: boolean;
}

interface IMenu {
  menuItems?: TMenuItem[];
  isShown?: boolean;
  isWithTitle?: boolean;
  className?: string;
  modifier: { [key: string]: boolean }
  isTest?: boolean;
  handleAction?: (action: string) => void;
}

const Menu: FC<IMenu> = ({
  menuItems = MENU_ITEMS,
  isShown = true,
  isWithTitle = true,
  isTest = false,
  modifier,
  className,
  handleAction
}): ReactElement => {
  let isMobile = false;

  if (!isTest && window) {
    isMobile = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(window.navigator.userAgent);
  }

  return (
    <div className={cn('menu', className, (!isShown && 'hidden'))}>
      {isWithTitle && <h1>{GAME_NAME}</h1>}
      <div className='menu-items'>
        {
          menuItems.map((item: TMenuItem) => (
            <MenuItem
              key={item.title}
              item={item}
              modifier={modifier}
              isMobile={isMobile}
              handleAction={handleAction}
            />)
          )}
      </div>
    </div>

  );
};

export default Menu;
