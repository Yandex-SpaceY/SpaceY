import React, { FC, FormEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/button/Button';
import Input from 'components/input/Input';
import { fakeOnChange, fakeOnClick } from 'utils';
import { LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const ProfileEdit: FC = (): ReactElement => {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="main" >
      <div className="content-wrapper double">
        <form onSubmit={handleSubmit} className="content">
          <h2>{PAGE_NAMES.PROFILE_EDIT}</h2>
          <div className="profile-image" />
          <div className="input-wrapper">
            <Input name="name" title="name" onChange={fakeOnChange} />
            <Input name="surname" title="surname" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper">
            <Input name="email" onChange={fakeOnChange} title="e-mail" type="email" />
            <Input name="codename" title="codename" onChange={fakeOnChange} />
          </div>
          <div className="input-wrapper">
            <Input name="phone" title="phone" onChange={fakeOnChange} />
            <Input name="password" title="password" onChange={fakeOnChange} type="password" />
          </div>
          <div className="button-wrapper">
            <Button type="submit" onClick={fakeOnClick}>SAVE</Button>
          </div>
          <Link to={ROUTE_CONSTANTS.PROFILE} className="link">
            {LINK_TEXTS.PROFILE}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div >
  );
};

export default ProfileEdit;
