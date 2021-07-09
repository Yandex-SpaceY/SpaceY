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
  titleAdditionIfModifierTrue?: string;
  titleAdditionIfModifierFalse?: string;
}

interface IMenu {
  menuItems?: TMenuItem[];
  isShown?: boolean;
  isWithTitle?: boolean;
  className?: string;
  modifier?: boolean;
  handleAction?: (action: string) => void;
}

const Menu: FC<IMenu> = ({
  menuItems = MENU_ITEMS,
  isShown = true,
  isWithTitle = true,
  modifier = true,
  className,
  handleAction
}): ReactElement => {
  return (
    <div className={cn('menu', className, (!isShown && 'hidden'))}>
      {isWithTitle
      && <h1>{GAME_NAME}</h1>
      }
      <div className='menu-items'>
        {
          menuItems.map(({ title, route, action, titleAdditionIfModifierTrue, titleAdditionIfModifierFalse }) => {
            const callback = () => {
              if (action && handleAction) handleAction(action);
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
                  {title} {
                    modifier
                      ? <span className='true'>{titleAdditionIfModifierTrue}</span>
                      : <span className='false'>{titleAdditionIfModifierFalse}</span>
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
