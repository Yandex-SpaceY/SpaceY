import * as React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

it('check render component Input', () => {
  const component = shallow(<Input
    value='testValue'
    name='testName'
    title='testTitle'
  />);

  expect(component.text()).toEqual('testTitle');

  expect(component).toMatchSnapshot();
});
