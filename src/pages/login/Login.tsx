import React from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';
import { GAME_NAME, LINKS_TEXT, PAGES_NAME } from 'constants/commonConstants';
import './login.scss';

const Login = (): React.ReactElement => {
  return (
    <div className="main login">
      <div className="content-wrapper">
        <h1>{GAME_NAME}</h1>
        <form className="content">
          <h2>{PAGES_NAME.LOGIN}</h2>
          <div className="input-wrapper">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
          </div>
          <div className="input-wrapper">
            <Input name="password" onChange={fakeOnChange} type="password" />
          </div>

          <Button onClick={fakeOnClick} text="GET IN" />
          <Link to="/signup" className="link">
            {LINKS_TEXT.NO_ACCOUNT}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
