import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Oops } from 'components';

type ErrorState = { isError: boolean }

class ErrorBoundary extends Component {
  state: ErrorState = {
    isError: false,
  }

  static getDerivedStateFromError(): ErrorState {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Pay attention to the error. ${error}: ${errorInfo}`);
  }

  clearState = (): void => {
    this.setState({
      isError: false,
    });
  }

  render(): ReactNode {
    return this.state.isError ? <Oops clearState={this.clearState} /> : this.props.children;
  }
}

export default ErrorBoundary;
