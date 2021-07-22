import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToLeaderboard } from 'api/leaderboardApi';
import { GameCanvas, GameOver, Menu, TMenuItem } from 'components';
import {
  gameIsGameStartedSelector,
  gameIsGamePausedSelector,
  gameIsGameOverSelector,
  gameIsSoundOnSelector,
  gameIsVibrationOnSelector,
  gameLastScoreSelector
} from 'store/game/selectors';
import { REQUEST_DATA } from 'constants/leaderConstants';
import { MENU_ITEMS, MENU_ITEMS_PAUSE, MENU_ITEMS_GAME_OVER, MENU_ACTIONS } from 'constants/menuConstants';
import { setIsGamePaused, setIsSoundOn } from 'store/game/actions';
import { userUserDataSelector } from 'store/user/selectors';
import { useWindowActive } from 'hooks';

import './game.scss';

const Game: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isWindowActive = useWindowActive();
  const isGameStarted = useSelector(gameIsGameStartedSelector);
  const isGamePaused = useSelector(gameIsGamePausedSelector);
  const isGameOver = useSelector(gameIsGameOverSelector);
  const isSoundOn = useSelector(gameIsSoundOnSelector);
  const isVibrationOn = useSelector(gameIsVibrationOnSelector);
  const lastScore = useSelector(gameLastScoreSelector);
  const { id, avatar, login } = useSelector(userUserDataSelector);

  const [ menuItems, setMenuItems ] = useState<TMenuItem[]>(MENU_ITEMS);
  const [ menuAction, setMenuAction ] = useState<string | null>(null);
  const [ isMenuWithTitle, setIsMenuWithTitle ] = useState<boolean>(true);
  const [ isSoundOnPrev, setIsSoundOnPrev ] = useState<boolean>(isSoundOn);

  useEffect(() => {
    if (!isWindowActive) {
      dispatch(setIsGamePaused(!isWindowActive));
      setIsSoundOnPrev(isSoundOn);
      dispatch(setIsSoundOn(isWindowActive));
    } else {
      if (isSoundOnPrev) {
        dispatch(setIsSoundOn(isSoundOnPrev));
      }
    }
  }, [isWindowActive]);

  useEffect(() => {
    addToLeaderboard({
      data: { id, avatar, login, spaceScore: lastScore },
      ratingFieldName: REQUEST_DATA.SCORE_FIELD
    });
  }, [lastScore]);

  useEffect(() => {
    if (isGameStarted && isGameOver) {
      setMenuItems(MENU_ITEMS_GAME_OVER);
      setIsMenuWithTitle(false);
    }
  }, [isGameOver]);

  const handleMenuAction = (action: string) => {
    if (action) {
      setMenuAction(action);

      if (action === MENU_ACTIONS.GAME_START || action === MENU_ACTIONS.GAME_RESTART) {
        setMenuItems(MENU_ITEMS_PAUSE);
        setIsMenuWithTitle(true);
      }

      if (action === MENU_ACTIONS.SHOW_MAIN_MENU) {
        setMenuItems(MENU_ITEMS);
        setIsMenuWithTitle(true);
      }
    }
  };

  const resetMenuAction = () => {
    setMenuAction(null);
  };

  return (
    <div className='main game'>
      <div className='content-wrapper'>
        <GameCanvas menuAction={menuAction} resetMenuAction={resetMenuAction} />
        <GameOver isShown={isGameOver} score={lastScore} />
        <Menu
          menuItems={menuItems}
          isShown={!isGameStarted || isGamePaused || isGameOver}
          handleAction={handleMenuAction}
          className={isMenuWithTitle ? '' : 'game-over-menu'}
          isWithTitle={isMenuWithTitle}
          soundModifier={isSoundOn}
          vibrationModifier={isVibrationOn}
        />
      </div>
    </div>
  );
};

export default Game;
