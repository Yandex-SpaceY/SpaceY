import React, { FC, ReactElement, useState } from 'react';

import GameCanvas from 'components/gameCanvas/GameCanvas';
import Menu from 'components/menu/Menu';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ACTIONS } from 'constants/commonConstants';

import './game.scss';

const Game: FC = (): ReactElement => {
  const [ isMenuShown, setIsMenuShown ] = useState(true);
  const [ menuItems, setMenuItems ] = useState(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuShown(!isMenuShown);
  };

  const handleMenuAction = (action: string) => {
    if (action !== null) {
      setMenuAction(action);
      if (action === MENU_ACTIONS.GAME_START) {
        setMenuItems(MENU_ITEMS_PAUSE);
      }
    }
  };

  const resetMenuAction = () => {
    if (menuAction !== null) {
      setMenuAction(null);
    }
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
