import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './login.scss';
import { fakeOnChange, fakeOnClick } from 'utils';

const Login = (): React.ReactElement => {
  return (
    <div className="main login">
      <div className="content-wrapper">
        <h1>SpaceY</h1>
        <div className="content">
          <h2>BOARDING</h2>
          <div className="input-wrapper">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
          </div>
          <div className="input-wrapper">
            <Input name="password" onChange={fakeOnChange} type="password" />
          </div>

          <Button onClick={fakeOnClick} text="GET IN" />
          <Link to="/signup" className="link">
            Has no Pilot ID?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
