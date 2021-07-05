import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GameCanvas, Menu, TMenuItem } from 'components';
import { gameIsGameStartedSelector, gameIsGamePausedSelector } from 'store/game/selectors';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ACTIONS } from 'constants/menuConstants';
import { setIsGamePaused } from 'store/game/actions';
import { useWindowActive } from 'hooks';

import './game.scss';

const Game: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isWindowActive = useWindowActive();
  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);

  const [ menuItems, setMenuItems ] = useState<TMenuItem[]>(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);

  useEffect(() => {
    if (!isWindowActive) {
      dispatch(setIsGamePaused(!isWindowActive));
    }
  }, [isWindowActive]);

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
