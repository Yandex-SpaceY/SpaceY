import React from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';

const Signup = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <h1>SpaceY</h1>
        <div className="content double">
          <h2>REGISTRATION</h2>
          <div className="input-wrapper double">
            <Input name="name" onChange={fakeOnChange} />
            <Input name="surname" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper double">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
            <Input name="codename" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper double">
            <Input name="phone" onChange={fakeOnChange} />
            <Input name="password" onChange={fakeOnChange} type="password" />
          </div>
          <div className="button-wrapper">
            <Button onClick={fakeOnClick} text="CHECK IN" />
          </div>
          <a href="#" className="link">
            Boarding
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
