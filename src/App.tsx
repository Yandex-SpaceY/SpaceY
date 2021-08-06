import React, { FC, ReactElement } from 'react';

import { ErrorBoundary, NotificationModal } from 'components';
import Router from 'router/Router';
import { hot } from 'react-hot-loader/root';

const App: FC = (): ReactElement => (
  <ErrorBoundary>
    <Router />
    <NotificationModal />
  </ErrorBoundary>
);

export default hot(App);
