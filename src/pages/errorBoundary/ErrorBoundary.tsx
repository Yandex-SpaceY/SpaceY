import React, { Component } from 'react';

import OopsPage from './components/oopsPage/OopsPage';

type ErrorState = { error: Error | null, errorInfo: React.ErrorInfo | null}

class ErrorBoundary extends Component {
  state: ErrorState = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    return this.state.errorInfo ? <OopsPage /> : this.props.children;
  }
}

export default ErrorBoundary;
