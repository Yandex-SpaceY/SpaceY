import * as React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

describe('test ErrorBoundary', () => {

  it('check render w/o error', () => {
    const testText = 'no error children text';
    const component = shallow(<ErrorBoundary>{testText}</ErrorBoundary>);

    expect(component.text()).toEqual(testText);

    expect(component).toMatchSnapshot();
  });

  it('check render with error', () => {
    const Throwable: React.FC = (): never => {
      throw new Error('Oops...');
    };
    const component = shallow(<ErrorBoundary>{Throwable}</ErrorBoundary>);
    console.log(component.debug());
    expect(component).toMatchSnapshot();
  });

});
