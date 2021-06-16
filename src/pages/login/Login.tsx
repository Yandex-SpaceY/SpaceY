import React from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';
import { GAME_NAME, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import './login.scss';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Login = (): React.ReactElement => {
  return (
    <div className="main login">
      <div className="content-wrapper">
        <h1>{GAME_NAME}</h1>
        <form className="content">
          <h2>{PAGE_NAMES.LOGIN}</h2>
          <div className="input-wrapper">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
          </div>
          <div className="input-wrapper">
            <Input name="password" title="password" onChange={fakeOnChange} type="password" />
          </div>

          <Button onClick={fakeOnClick} text="GET IN" />
          <Link to={ROUTE_CONSTANTS.SIGNUP} className="link">
            {LINK_TEXTS.SIGNUP}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
