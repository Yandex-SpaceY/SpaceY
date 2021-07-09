import * as React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';
import { Throwable } from './mock';

describe('test ErrorBoundary', () => {
  it('check render w/o error', () => {
    const testText = 'no error children text';
    const component = shallow(<ErrorBoundary>{testText}</ErrorBoundary>);

    expect(component.text()).toEqual(testText);
    expect(component).toMatchSnapshot();
  });
  it('check render with error', () => {
    const component = shallow(<ErrorBoundary><Throwable /></ErrorBoundary>);

    expect(component).toMatchSnapshot();
  });
});
