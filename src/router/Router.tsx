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

const Router: React.FC = () => (
  <Switch>
    <Redirect from='/' exact to={ROUTE_CONSTANTS.LOGIN} />
    <Route path={ROUTE_CONSTANTS.CHANGE_PASSWORD} component={ChangePassword} />
    <Route path={ROUTE_CONSTANTS.DASHBOARD} component={Dashboard} />
    <Route path={ROUTE_CONSTANTS.FORUM} component={Forum} />
    <Route path={ROUTE_CONSTANTS.GAME} component={Game} />
    <Route path={ROUTE_CONSTANTS.LEADERBOARD} component={Leaderboard} />
    <Route path={ROUTE_CONSTANTS.LOGIN} component={Login} />
    <Route path={ROUTE_CONSTANTS.NOT_FOUND} component={NotFound} />
    <Route path={ROUTE_CONSTANTS.PROFILE_EDIT} component={ProfileEdit} />
    <Route exact path={ROUTE_CONSTANTS.PROFILE} component={Profile} />
    <Route path={ROUTE_CONSTANTS.SIGNUP} component={Signup} />
    <Redirect to={ROUTE_CONSTANTS.NOT_FOUND} />
  </Switch>
);

export default Router;
