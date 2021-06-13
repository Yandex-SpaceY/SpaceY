import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = (): React.ReactElement => (
  <>
    <Link to='/dashboard'>Go to dashboard</Link>
    <Link to='/signup'>I want to create an account</Link>
  </>
);

export default Login;
