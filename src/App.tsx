import React, { FC, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Router from 'router/Router';
import { ErrorBoundary } from 'components';
import { userUserDataSelector } from 'store/user/selectors';
import { getUserDataFromServer } from 'store/user/actions';

const App: FC = (): ReactElement => {
  const userDataState = useSelector(userUserDataSelector);
  const dispatch = useDispatch();

  return (
    <div onClick={() => (dispatch(getUserDataFromServer()))}>
      Test
      {userDataState?.id.toString()}
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </div>
  );
};

export default App;
