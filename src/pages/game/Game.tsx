import React, { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import GameCanvas from 'components/gameCanvas/GameCanvas';
import { Menu, TMenuItem } from 'components';
import { gameIsGameStartedSelector, gameIsGamePausedSelector } from 'store/game/selectors';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ACTIONS } from 'constants/menuConstants';

import './game.scss';

const Game: FC = (): ReactElement => {
  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);

  const [ menuItems, setMenuItems ] = useState<TMenuItem[]>(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);

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
        <GameCanvas menuAction={menuAction} resetMenuAction={resetMenuAction}/>
        <Menu menuItems={menuItems} isShown={!isGameStarted || isGamePaused} handleAction={handleMenuAction}/>
      </div>
    </div>
  );
};

export default Game;
