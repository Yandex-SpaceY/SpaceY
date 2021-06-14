import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';
import { Oops } from 'pages/';

type ErrorState = { error: Error | null, errorInfo: React.ErrorInfo | null}

class ErrorBoundary extends Component<RouteComponentProps, ErrorState> {
  state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.history.push(routeConstants.OOPS);

    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    return this.state.errorInfo ? <Oops /> : this.props.children;
  }
}

export default withRouter(ErrorBoundary);
