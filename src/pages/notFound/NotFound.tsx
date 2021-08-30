import React, { FC, ReactElement } from 'react';

import { MENU_ITEMS_NOT_FOUND } from 'constants/menuConstants';
import { PageMeta, Menu } from 'components';
import { PAGE_NAMES } from 'constants/commonConstants';

const NotFound: FC = (): ReactElement => (
  <div className='main not-found'>
    <PageMeta title={PAGE_NAMES.PAGE_NOT_FOUND} />
    <h1>No-o-o-o-o-o-o-o-o</h1>
    <Menu className={'not-found-menu'} menuItems={MENU_ITEMS_NOT_FOUND} isWithTitle={false} modifier={{}} />
  </div>
);

export default NotFound;
