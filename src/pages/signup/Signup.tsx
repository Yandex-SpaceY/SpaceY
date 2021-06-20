import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange } from 'utils';
import { signup } from 'api/authApi';
import { DEFAULT_USER_STATE, GAME_NAME, LINK_TEXTS, MOCK_USER_STATE, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Signup: FC = (): ReactElement => {
  const [state, setState] = useState(DEFAULT_USER_STATE);

  useEffect(() => setState(MOCK_USER_STATE), []);

  const signupHandler = () => {
    signup(state);
  };

  return (
    <div className="main">
      <div className="content-wrapper double">
        <h1>{GAME_NAME}</h1>
        <form className="content">
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
          <div className="input-wrapper">
            <Input value={state.first_name} name="first_name" title="first name" onChange={fakeOnChange} />
            <Input value={state.second_name} name="second_name" title="second name" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper">
            <Input value={state.email} name="email" onChange={fakeOnChange} title="e-mail" type="email" />
            <Input value={state.login} name="login" title="login" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper">
            <Input value={state.phone} name="phone" title="phone" onChange={fakeOnChange} />
            <Input value={state.password} name="password" title="password" onChange={fakeOnChange} type="password" />
          </div>
          <div className="button-wrapper">
            <Button onClick={signupHandler}>SIGN UP</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.LOGIN} className="link">{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">{LINK_TEXTS.DASHBOARD}</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
