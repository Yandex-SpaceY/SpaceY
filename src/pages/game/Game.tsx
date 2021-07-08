import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GameCanvas, GameOver, Menu, TMenuItem } from 'components';
import {
  gameIsGameStartedSelector,
  gameIsGamePausedSelector,
  gameIsGameOverSelector,
  gameLastScoreSelector
} from 'store/game/selectors';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ITEMS_GAME_OVER, MENU_ACTIONS } from 'constants/menuConstants';
import { setIsGamePaused } from 'store/game/actions';
import { useWindowActive } from 'hooks';

import './game.scss';

const Game: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isWindowActive = useWindowActive();
  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);
  const isGameOver = useSelector(gameIsGameOverSelector);
  const lastScore = useSelector(gameLastScoreSelector);

  const [ menuItems, setMenuItems ] = useState<TMenuItem[]>(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);
  const [ menuClassName, setMenuClassName ] = useState<string>('');
  const [ menuWithTitle, setMenuWithTitle ] = useState<boolean>(true);

  useEffect(() => {
    if (!isWindowActive) {
      dispatch(setIsGamePaused(!isWindowActive));
    }
  }, [isWindowActive]);

  useEffect(() => {
    if (isGameStarted && isGameOver) {
      setMenuItems(MENU_ITEMS_GAME_OVER);
      setMenuClassName('game-over__menu');
      setMenuWithTitle(false);
    }
  }, [isGameOver]);

  const handleMenuAction = (action: string) => {
    if (action) {
      setMenuAction(action);

      if (action === MENU_ACTIONS.GAME_START || action === MENU_ACTIONS.GAME_RESTART) {
        setMenuItems(MENU_ITEMS_PAUSE);
        setMenuClassName('');
        setMenuWithTitle(true);
      }

      if (action === MENU_ACTIONS.SHOW_MAIN_MENU) {
        setMenuItems(MENU_ITEMS);
        setMenuClassName('');
        setMenuWithTitle(true);
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
        <GameOver isShown={isGameOver} score={lastScore}/>
        <Menu menuItems={menuItems} isShown={
          !isGameStarted || isGamePaused || isGameOver
        } handleAction={handleMenuAction} className={menuClassName} withTitle={menuWithTitle}/>
      </div>
    </div>
  );
};

export default Game;
