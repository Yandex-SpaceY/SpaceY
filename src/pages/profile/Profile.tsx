import React from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import { LINKS_TEXT, PAGES_NAME } from 'constants/commonConstants';

const Profile = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <form className="content double">
          <h2>{PAGES_NAME.PROFILE}</h2>
          <div className="profile-image" />
          <div className="input-wrapper double">
            <Input name="name" title="name" />
            <Input name="surname" title="surname" />
          </div>
          <div className="input-wrapper double">
            <Input name="email" title="e-mail" type="email" />
            <Input name="codename" title="codename" />
          </div>
          <div className="input-wrapper double">
            <Input name="phone" title="phone" />
            <Input name="password" title="password" type="password" />
          </div>
          <Link to="/profile/edit" className="link">
            {LINKS_TEXT.PROFILE_EDIT}
          </Link>
          <Link to="/dashboard" className="link">
            {LINKS_TEXT.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
