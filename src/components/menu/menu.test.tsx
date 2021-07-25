import * as React from 'react';
import { shallow } from 'enzyme';

import Menu from './Menu';

it('check render component Menu', () => {
  const component = shallow(<Menu isTest={true} modifier={{ sound: true, vibration: true }} />);

  expect(component).toMatchSnapshot();
});
