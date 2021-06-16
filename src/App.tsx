import React from 'react';

import Router from 'router/Router';
import { ErrorBoundary } from 'components';

const App: React.FC = (): React.ReactElement => (
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);

export default App;
