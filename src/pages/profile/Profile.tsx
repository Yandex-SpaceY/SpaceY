import React from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/input/Input';
import { LINK_TEXTS, PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';

const Profile = (): React.ReactElement => {
  return (
    <div className="main">
      <div className="content-wrapper double">
        <form className="content double">
          <h2>{PAGE_NAMES.PROFILE}</h2>
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
          <Link to={ROUTE_CONSTANTS.PROFILE_EDIT} className="link">
            {LINK_TEXTS.PROFILE_EDIT}
          </Link>
          <Link to={ROUTE_CONSTANTS.DASHBOARD} className="link">
            {LINK_TEXTS.DASHBOARD}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
