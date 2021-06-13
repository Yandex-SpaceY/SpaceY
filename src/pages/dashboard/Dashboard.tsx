import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = (): React.ReactElement => (
  <>
    <Link to='/leaderboard'>Best players</Link>
    <Link to='/game'>Start</Link>
    <Link to='/profile'>My profile</Link>
    <Link to='/forum'>Forum</Link>
  </>
);

export default Dashboard;
