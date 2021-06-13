import React from 'react';

import ErrorBoundary from 'pages/errorBoundary/ErrorBoundary';
import Router from 'router/Router';

const App: React.FC = (): React.ReactElement => (
  <ErrorBoundary>
    <Router />
    <h1>The Space Y game will be here</h1>
  </ErrorBoundary>
);

export default App;
