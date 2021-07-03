import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Router from 'router/Router';
import { setIsGamePaused } from 'store/game/actions';
import { useIsWindowActive } from 'hooks';
import { ErrorBoundary } from 'components';

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isWindowActive = useIsWindowActive();

  useEffect(() => {
    if (!isWindowActive) {
      dispatch(setIsGamePaused(!isWindowActive));
    }
  }, [isWindowActive]);

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
