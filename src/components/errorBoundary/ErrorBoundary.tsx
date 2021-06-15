import React, { Component } from 'react';

import { Oops } from 'components';

type ErrorState = { error: Error | null, errorInfo: React.ErrorInfo | null }

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

  clearState = (): void => {
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render(): React.ReactNode {
    return this.state.errorInfo ? <Oops clearState={this.clearState} /> : this.props.children;
  }
}

export default ErrorBoundary;
