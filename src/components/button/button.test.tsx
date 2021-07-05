import * as React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

it('check render component Button', () => {
  const component = shallow(<Button>some text</Button>);
  expect(component).toMatchSnapshot();
});