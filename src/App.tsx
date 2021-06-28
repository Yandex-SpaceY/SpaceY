import React, { FC, ReactElement } from 'react';

import Router from 'router/Router';
import { ErrorBoundary } from 'components';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);

export default App;
