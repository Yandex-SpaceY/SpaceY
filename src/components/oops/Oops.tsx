import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/routeConstants';

interface IProps {
  clearState: () => void
}

const Oops: FC<IProps> = ({ clearState }): ReactElement => (
  <>
    <Link to={ROUTE_CONSTANTS.GAME} onClick={clearState}>Go to game</Link>
    <Link to={ROUTE_CONSTANTS.SIGNUP} onClick={clearState}>I want to create an account</Link>
    some other links
  </>
);

export default Oops;
