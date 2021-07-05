import * as React from 'react';
import { shallow } from 'enzyme';

import Pagination from './Pagination';

it('check render component Pagination', () => {
  const component = shallow(
    <Pagination
      totalPages={3}
      onPageChange={() => console.log('I was clicked')}
      currentPage={1}
    />);

  expect(component).toMatchSnapshot();
});
