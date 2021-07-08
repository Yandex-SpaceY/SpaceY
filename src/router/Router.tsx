import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import {
  ChangePassword,
  Dashboard,
  Forum,
  Game,
  Leaderboard,
  Login,
  NotFound,
  Profile,
  ProfileEdit,
  Signup
} from 'pages';
import { WithAuthPrivateRoute } from 'hocs';

const Router: React.FC = () => (
  <Switch>
    <Redirect from='/' exact to={ROUTE_CONSTANTS.LOGIN} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.CHANGE_PASSWORD} component={ChangePassword} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.DASHBOARD} component={Dashboard} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.FORUM} component={Forum} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.GAME} component={Game} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.LEADERBOARD} component={Leaderboard} />
    <Route path={ROUTE_CONSTANTS.LOGIN} component={Login} />
    <Route path={ROUTE_CONSTANTS.NOT_FOUND} component={NotFound} />
    <WithAuthPrivateRoute path={ROUTE_CONSTANTS.PROFILE_EDIT} component={ProfileEdit} />
    <WithAuthPrivateRoute exact path={ROUTE_CONSTANTS.PROFILE} component={Profile} />
    <Route path={ROUTE_CONSTANTS.SIGNUP} component={Signup} />
    <Redirect to={ROUTE_CONSTANTS.NOT_FOUND} />
  </Switch>
);

export default Router;
