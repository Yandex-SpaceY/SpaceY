import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Router from 'router/Router';
import { ErrorBoundary } from 'components';
import { AppState } from 'store/types.d';

const App: FC = (): ReactElement => {
  const user = useSelector((state: AppState) => state);

  return (
    <div>{user.toString()}
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </div>
  );
};

export default App;
