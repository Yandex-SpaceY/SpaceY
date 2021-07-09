import * as React from 'react';
import { shallow } from 'enzyme';

import Oops from './Oops';

it('check render page Oops', () => {
  const component = shallow(<Oops clearState={() => false} />);

  expect(component).toMatchSnapshot();
});
