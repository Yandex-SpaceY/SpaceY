import * as React from 'react';
import { shallow } from 'enzyme';

import Menu from './Menu';

it('check render component Menu', () => {
  const component = shallow(<Menu />);

  expect(component).toMatchSnapshot();
});
