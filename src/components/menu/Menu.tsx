import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { GAME_NAME, TOGGLE_ITEMS } from 'constants/commonConstants';
import { MENU_ITEMS } from 'constants/menuConstants';

import './menu.scss';

export type TMenuItem = {
  title: string;
  route: string | null;
  action: string | null;
  isWithModifier?: boolean;
  isMobileOnly?: boolean;
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
      {isWithTitle
        && <h1>{GAME_NAME}</h1>
      }
      <div className='menu-items'>
        {
          menuItems.map(({ title, route, action, isMobileOnly, isWithModifier }) => {
            if (isMobileOnly && !isMobile) {
              return;
            }
            const callback = () => {
              if (action && handleAction) {
                handleAction(action);
              }
            };

            if (route) {
              return (
                <Link key={title} className='menu-item' to={route} onClick={action ? callback : undefined}>
                  {title}
                </Link>
              );
            }

            if (action) {
              const mode = modifier[title] ? 'ON' : 'OFF';

              return (
                <span key={title} className='menu-item' onClick={callback}>
                  {`${title}${isWithModifier ? ':' : ''}`}
                  {isWithModifier
                    && <span className={`menu-item_mode_${mode.toLowerCase()}`}>{TOGGLE_ITEMS[mode]}</span>
                  }
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
