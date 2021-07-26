import React, { FC, ReactElement } from 'react';

import { ErrorBoundary } from 'components';
import Router from 'router/Router';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);

export default App;
