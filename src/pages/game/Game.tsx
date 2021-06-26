import React, { FC, ReactElement, useState } from 'react';

import GameCanvas from 'components/gameCanvas/GameCanvas';
import { Menu, TMenuItem } from 'components/menu/Menu';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ACTIONS } from 'constants/menuConstants';

import './game.scss';

const Game: FC = (): ReactElement => {
  const [ isMenuShown, setIsMenuShown ] = useState<boolean>(true);
  const [ menuItems, setMenuItems ] = useState<TMenuItem[]>(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuShown(prevValue => !prevValue);
  };

  const handleMenuAction = (action: string) => {
    if (action) {
      setMenuAction(action);
      if (action === MENU_ACTIONS.GAME_START) {
        setMenuItems(MENU_ITEMS_PAUSE);
      }
    }
  };

  const resetMenuAction = () => {
    setMenuAction(null);
  };

  return (
    <div className='main game'>
      <div className='content-wrapper'>
        <GameCanvas toggleMenu={toggleMenu} menuAction={menuAction} resetMenuAction={resetMenuAction}/>
        <Menu menuItems={menuItems} isShown={isMenuShown} handleAction={handleMenuAction}/>
      </div>
    </div>
  );
};

export default Game;
