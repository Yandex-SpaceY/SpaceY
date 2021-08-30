import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { IModifier } from 'store/types';
import { TMenuItem } from './Menu';
import { GAME_OPTIONS, SKILL_OPTIONS_TEXT, THEME_OPTIONS_TEXT } from 'constants/gameConstants';

interface IProps {
  item: TMenuItem;
  modifier: IModifier;
  isMobile: boolean;
  handleAction?: (action: string) => void;
}

const MenuItem: FC<IProps> = ({ item, modifier, isMobile, handleAction }): ReactElement | null => {
  const { title, route, action, mobileOnly, options } = item;

  if (mobileOnly && !isMobile) {
    return null;
  }

  const callback = () => {
    if (action && handleAction) {
      handleAction(action);
    }
  };

  if (title === GAME_OPTIONS.THEME_TITLE && typeof modifier[title] === 'string') {
    const mode = THEME_OPTIONS_TEXT[modifier[title].toString()];

    return (
      <span key={title} className='menu-item' onClick={callback}>
        {`${title}:`}
        <span className='menu-item-theme'>{mode.toUpperCase()}</span>
      </span>
    );
  }

  if (title === GAME_OPTIONS.SKILL_TITLE && typeof modifier[title] === 'number') {
    const mode = SKILL_OPTIONS_TEXT[modifier[title]];

    return (
      <span key={title} className='menu-item' onClick={callback}>
        {`${title}:`}
        <span className='menu-item-skill'>{mode.toUpperCase()}</span>
      </span>
    );
  }

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
        {`${title}${options ? ':' : ''}`}
        {options
          && <span className={`menu-item_mode_${mode.toLowerCase()}`}>{options[mode]}</span>
        }
      </span>
    );
  }

  return null;
};

export default MenuItem;
