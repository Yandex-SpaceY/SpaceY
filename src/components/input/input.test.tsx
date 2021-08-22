import * as React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('test Input', () => {
  it('check render component with title', () => {
    const component = shallow(<Input
      value='testValue'
      name='testName'
      title='testTitle'
    />);

    expect(component.text()).toEqual('testTitle');
    expect(component).toMatchSnapshot();
  });
  it('check render component w/o value', () => {
    const component = shallow(<Input></Input>);

    expect(component).toMatchSnapshot();
  });
  it('check render component with type', () => {
    const component = shallow(<Input type='password'></Input>);

    expect(component).toMatchSnapshot();
  });
  it('check render component with onBlur', () => {
    const mockOnBlur = jest.fn();
    const mockOnChange = jest.fn();
    const component = shallow(<Input
      value='testValue'
      name='testName'
      title='testTitle'
      onBlur={mockOnBlur}
      onChange={mockOnChange}
    />);

    expect(component).toMatchSnapshot();
  });
});
