import React from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';
import { GAME_NAME, LINKS_TEXT, PAGES_NAME } from 'constants/commonConstants';

const Signup = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <h1>{GAME_NAME}</h1>
        <form className="content double">
          <h2>{PAGES_NAME.REGISTRATION}</h2>
          <div className="input-wrapper double">
            <Input name="name" title="name" onChange={fakeOnChange} />
            <Input name="surname" title="surname" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper double">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
            <Input name="codename" title="codename" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper double">
            <Input name="phone" title="phone" onChange={fakeOnChange} />
            <Input name="password" title="password" onChange={fakeOnChange} type="password" />
          </div>
          <div className="button-wrapper">
            <Button onClick={fakeOnClick} text="CHECK IN" />
          </div>
          <Link to='/login' className="link">{LINKS_TEXT.HAVE_ACCOUNT}</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
