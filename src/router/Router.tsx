import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';
import {
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
    <Redirect from='/' exact to={routeConstants.LOGIN} />
    <Route path={routeConstants.LOGIN} component={Login} />
    <Route path={routeConstants.SIGNUP} component={Signup} />
    <Route path={routeConstants.DASHBOARD} component={Dashboard} />
    <Route exact path={routeConstants.PROFILE} component={Profile} />
    <Route path={routeConstants.PROFILE_EDIT} component={ProfileEdit} />
    <Route path={routeConstants.FORUM} component={Forum} />
    <Route path={routeConstants.LEADERBOARD} component={Leaderboard} />
    <Route path={routeConstants.GAME} component={Game} />
    <Route path={routeConstants.NOT_FOUND} component={NotFound} />
    <Redirect to={routeConstants.NOT_FOUND} />
  </Switch>
);

export default Router;
