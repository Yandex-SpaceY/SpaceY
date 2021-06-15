import Button from 'components/button/Button';
import Input from 'components/input/Input';
import { LINKS_TEXT, PAGES_NAME } from 'constants/commonConstants';
import React from 'react';
import { Link } from 'react-router-dom';
import { fakeOnChange, fakeOnClick } from 'utils';

const ProfileEdit = (): React.ReactElement => {
  return (<div className="main" >
    <div className="content-wrapper double">
      <form className="content double">
        <h2>{PAGES_NAME.PROFILE_EDIT}</h2>
        <div className="profile-image" />
        <div className="input-wrapper double">
          <Input name="name" title="name"  onChange={fakeOnChange} />
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
          <Button onClick={fakeOnClick} text="SAVE" />
        </div>
        <Link to="/profile" className="link">
          {LINKS_TEXT.PROFILE}
        </Link>
        <Link to="/dashboard" className="link">
          {LINKS_TEXT.DASHBOARD}
        </Link>
      </form>
    </div>
  </div >);
};

export default ProfileEdit;
