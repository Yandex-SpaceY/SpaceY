import React, { FC, ReactElement } from 'react';

import { ErrorBoundary, Spinner } from 'components';
import Router from 'router/Router';
import { hot } from 'react-hot-loader/root';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
    <Spinner />
  </ErrorBoundary>
);

export default hot(App);
