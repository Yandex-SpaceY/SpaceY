import React, { FC, ReactElement } from 'react';

import { ErrorBoundary } from 'components';
import Router from 'router/Router';
import { hot } from 'react-hot-loader/root';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);

export default hot(App);
