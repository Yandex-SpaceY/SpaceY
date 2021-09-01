import React, { FC, useEffect, ReactElement, ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { apiPostgresSignIn } from 'api/authApi';
import { signInYandex } from 'api/oAuthApi';
import { GAME_URL } from 'constants/commonConstants';
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
    const authorizeUser = async () => {
      const code = new URL(location.href).searchParams.get('code');

      if (code) {
        await signInYandex({ code, redirect_uri: GAME_URL });
        await apiPostgresSignIn();
      }

      if (!isAuthorized) {
        dispatch(getUserDataFromServer());
      }
    };

    authorizeUser();
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
