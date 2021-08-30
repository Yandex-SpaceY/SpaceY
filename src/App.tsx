import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ErrorBoundary, NotificationModal, Spinner } from 'components';
import Router from 'router/Router';
import { hot } from 'react-hot-loader/root';
import { userSettingSelector } from 'store/user/selectors';

const App: FC = (): ReactElement => {
  const settings = useSelector(userSettingSelector);
  const { theme } = settings;

  return (
    <ErrorBoundary>
      <div className={cn('app-wrapper', 'theme-' + theme)}>
        <Router />
        <Spinner />
        <NotificationModal />
      </div>
    </ErrorBoundary>
  );
};

export default hot(App);
