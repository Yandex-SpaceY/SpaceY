import React from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';

const Signup = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <div className="content double">
          <img src="src/assets/images/cross.png" alt="close button" className="close-button" />
          <h2>PROFILE</h2>
          <div className="profile-image" />
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
            <Button onClick={fakeOnClick} text="SAVE" />
          </div>
          <a href="#" className="link">
            Unboarding
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
