import React, { useEffect, FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ErrorBoundary } from 'components';
import Router from 'router/Router';
import { getUserDataFromServer } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector(userUserDataSelector);

  useEffect(() => {
    if (!Object.keys(userData).length) {
      dispatch(getUserDataFromServer());
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
