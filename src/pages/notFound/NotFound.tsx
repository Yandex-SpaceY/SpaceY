import React, { FC, ReactElement } from 'react';

import { PageMeta } from 'components';
import { PAGE_NAMES } from 'constants/commonConstants';

const NotFound: FC = (): ReactElement => (
  <div className='main'>
    <PageMeta title={PAGE_NAMES.PAGE_NOT_FOUND} />
    <h1>No-o-o-o-o-o-o-o-o</h1>
  </div>
);

export default NotFound;
