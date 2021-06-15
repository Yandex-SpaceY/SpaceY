import React from 'react';
import { Link } from 'react-router-dom';

const Oops = ({ clearState }: { clearState: () => void }): React.ReactElement => (
  <>
    <Link to='/dashboard' onClick={clearState}>Go to dashboard</Link>
    <Link to='/signup' onClick={clearState}>I want to create an account</Link>
    some other links
  </>
);

export default Oops;
