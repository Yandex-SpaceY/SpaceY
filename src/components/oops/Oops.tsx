import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

interface Props {
  clearState: () => void
}

const Oops: FC<Props> = ({ clearState }): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.DASHBOARD} onClick={clearState}>Go to dashboard</Link>
    <Link to={ROUTE_CONSTANTS.SIGNUP} onClick={clearState}>I want to create an account</Link>
    some other links
  </>
);

export default Oops;
