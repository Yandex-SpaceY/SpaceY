import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { GAME_NAME, ON_OFF_ITEMS } from 'constants/commonConstants';
import { MENU_ITEMS } from 'constants/menuConstants';

import './menu.scss';

export type TMenuItem = {
  title: string;
  route: string | null;
  action: string | null;
  titleAdditionIfModifierTrue?: string;
  titleAdditionIfModifierFalse?: string;
}

interface IMenu {
  menuItems?: TMenuItem[];
  isShown?: boolean;
  isWithTitle?: boolean;
  className?: string;
  soundModifier?: boolean;
  vibrationModifier?: boolean;
  handleAction?: (action: string) => void;
}

const Menu: FC<IMenu> = ({
  menuItems = MENU_ITEMS,
  isShown = true,
  isWithTitle = true,
  soundModifier = true,
  vibrationModifier = true,
  className,
  handleAction
}): ReactElement => {
  const getMenuItem = (title: string): ReactElement | null => {
    let result;
    switch (title) {
      case 'sound:': {
        result = soundModifier ? <span className='true'>{ON_OFF_ITEMS.ON}</span>
          : <span className='false'>{ON_OFF_ITEMS.OFF}</span>;
        break;
      }
      case 'vibration:': {
        result = vibrationModifier ? <span className='true'>{ON_OFF_ITEMS.ON}</span>
          : <span className='false'>{ON_OFF_ITEMS.OFF}</span>;
        break;
      }
      default: result = null;
    }

    return result;
  };

  return (
    <div className={cn('menu', className, (!isShown && 'hidden'))}>
      {isWithTitle
        && <h1>{GAME_NAME}</h1>
      }
      <div className='menu-items'>
        {
          menuItems.map(({ title, route, action }) => {
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
              return (
                <span key={title} className='menu-item' onClick={callback}>
                  {title} {getMenuItem(title)}
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
