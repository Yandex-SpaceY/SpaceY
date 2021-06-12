import React from 'react';
import { Link } from 'react-router-dom';

const ProfileEdit: React.FC = (): React.ReactElement => (
  <>
    <Link to='/profile'>See my profile</Link>
    <Link to='/dashboard'>Main page</Link>
  </>
);

export default ProfileEdit;
