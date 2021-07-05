import * as React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

it('check render component ErrorBoundary', () => {
  const testText = 'no error children text';
  const component = shallow(<ErrorBoundary>{testText}</ErrorBoundary>);

  expect(component.text()).toEqual(testText);

  expect(component).toMatchSnapshot();
});
