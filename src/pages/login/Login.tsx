import React from 'react';
import './login.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';


const Login: React.FC = (): React.ReactElement => {
  return (
    <div className="main-login">
      <div className="content-wrapper">
        <h1>SpaceY</h1>
        <div className="content">
          <h2>BOARDING</h2>
          <div className="one-input-wrapper">
            <Input
              name="email"
              onChange={(e: any) => console.log(e.target.value)}
              title="e-mail"
              type="email"
            />
          </div>
          <div className="one-input-wrapper">
            <Input
              name="password"
              onChange={(e: any) => console.log(e.target.value)}
              title="password"
              type="password"
            />
          </div>

          <Button onClick={() => console.log('hello')} text="GET IN" />
          <a href="#" className="link">
            Has no Pilot ID?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
