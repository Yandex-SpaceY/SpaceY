import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { fakeOnChange, fakeOnClick } from 'utils';
import { GAME_NAME, LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Signup = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <h1>{GAME_NAME}</h1>
        <form className="content double">
          <h2>{PAGE_NAMES.REGISTRATION}</h2>
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
          <Link to={ROUTE_CONSTANTS.LOGIN} className="link">{LINK_TEXTS.LOGIN}</Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">{LINK_TEXTS.DASHBOARD}</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
