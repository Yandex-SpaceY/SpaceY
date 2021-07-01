import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Router from 'router/Router';
import { setIsGamePaused } from 'store/game/actions';
import { useIsWindowActive } from 'hooks';
import { ErrorBoundary } from 'components';

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const IsWindowActive = useIsWindowActive();

  useEffect(() => {
    if (!IsWindowActive) dispatch(setIsGamePaused(!IsWindowActive));
  }, [IsWindowActive]);

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
