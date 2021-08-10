import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { TMenuItem } from './Menu';
import { TOGGLE_ITEMS } from 'constants/commonConstants';

interface IProps {
  item: TMenuItem;
  modifier:  { [key: string]: boolean };
  isMobile: boolean;
  handleAction?: (action: string) => void;
}

const MenuItem: FC<IProps> = ({ item, modifier, isMobile, handleAction }): ReactElement | null => {
  const { title, route, action, mobileOnly, withModifier } = item;

  if (mobileOnly && !isMobile) {
    return null;
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
        {`${title}${withModifier ? ':' : ''}`}
        {withModifier
          && <span className={`menu-item_mode_${mode.toLowerCase()}`}>{TOGGLE_ITEMS[mode]}</span>
        }
      </span>
    );
  }

  return null;
};

export default MenuItem;
