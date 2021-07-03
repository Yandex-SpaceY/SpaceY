import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Router from 'router/Router';
import { setIsGamePaused } from 'store/game/actions';
import { useWindowActive } from 'hooks';
import { ErrorBoundary } from 'components';

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isWindowActive = useWindowActive();

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
