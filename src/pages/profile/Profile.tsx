import React from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = (): React.ReactElement => (
  <>
    <Link to='/profile/edit'>Edit my info</Link>
    <Link to='/dashboard'>Main page</Link>
  </>
);

export default Profile;
