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
    expect(component.find('input').get(0).props.type).toEqual('password');
    expect(component).toMatchSnapshot();
  });

  it('check render component with onChange', () => {
    const mockOnChange = jest.fn();
    const component = shallow(<Input
      value='testValue'
      name='testName'
      title='testTitle'
      onChange={mockOnChange}
    />);
    component.find('input').simulate('change');
    expect(mockOnChange.mock.calls.length).toEqual(1);
    expect(component).toMatchSnapshot();
  });

});
