import React, { FC, ReactElement } from 'react';

import Router from 'router/Router';
import { ErrorBoundary } from 'components';
import { startServiceWorker } from './serviceWorker';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);
startServiceWorker();

export default App;
