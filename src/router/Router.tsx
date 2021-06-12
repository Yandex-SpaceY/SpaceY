import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Dashboard, Forum, Game, Leaderboard, Login, NotFound, Profile, ProfileEdit, Signup } from 'pages';

const Router: React.FC = () => (
  <Switch>
    <Redirect from='/' exact to='/login' />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/dashboard' component={Dashboard} />
    <Route exact path='/profile' component={Profile} />
    <Route path='/profile/edit' component={ProfileEdit} />
    <Route path='/forum' component={Forum} />
    <Route path='/leaderboard' component={Leaderboard} />
    <Route path='/game' component={Game} />
    <Route path='/404' component={NotFound} />
    <Redirect to='/404' />
  </Switch>
);

export default Router;
