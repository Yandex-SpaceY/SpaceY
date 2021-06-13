import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = (): React.ReactElement => (
  <>
    <Link to='/login'>I have an account</Link>
    <Link to='/dashboard'>Create an account and enter the game</Link>
  </>
);

export default Signup;
