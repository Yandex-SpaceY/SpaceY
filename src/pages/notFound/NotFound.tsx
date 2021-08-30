import React, { FC, ReactElement } from 'react';

import { MENU_ITEMS_NOT_FOUND } from 'constants/menuConstants';
import { PageMeta, Menu } from 'components';
import { NOT_FOUND_TEXT, PAGE_NAMES } from 'constants/commonConstants';

import './notFound.scss';

const NotFound: FC = (): ReactElement => (
  <div className='main not-found'>
    <PageMeta title={PAGE_NAMES.PAGE_NOT_FOUND} />
    <h1>{NOT_FOUND_TEXT}</h1>
    <Menu className={'not-found-menu'} menuItems={MENU_ITEMS_NOT_FOUND} isWithTitle={false} modifier={{}} />
  </div>
);

export default NotFound;
