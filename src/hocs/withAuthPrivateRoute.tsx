import React, { FC, useEffect, ReactElement, ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { getUserDataFromServer } from 'store/user/actions';
import { userAuthSelector } from 'store/user/selectors';

interface IRoute {
  component: ElementType,
  path: string,
  exact?: boolean,
}

const WithAuthPrivateRoute: FC<IRoute> = ({ component: ChildComponent, ...rest }): ReactElement => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(userAuthSelector);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(getUserDataFromServer());
    }
  }, []);

  if (isAuthorized === null) {
    return <></>;
  }

  return (
    <Route {...rest} render={props =>
      !isAuthorized ? (
        <Redirect to={ROUTE_CONSTANTS.LOGIN} />
      ) : (
        <ChildComponent {...props} />
      )
    }
    />
  );
};

export default WithAuthPrivateRoute;
