import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { routeConstants } from 'constants/routeConstants';

interface Props {
  clearState: () => void
}

const Oops: FC<Props> = ({ clearState }): ReactElement => (
  <>
    <Link to={routeConstants.DASHBOARD} onClick={clearState}>Go to dashboard</Link>
    <Link to={routeConstants.SIGNUP} onClick={clearState}>I want to create an account</Link>
    some other links
  </>
);

export default Oops;
