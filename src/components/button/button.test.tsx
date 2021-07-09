import * as React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('test Button', () => {
  it('check render component with children', () => {
    const component = shallow(<Button>some text</Button>);

    expect(component).toMatchSnapshot();
  });
  it('check render component w/o children', () => {
    const component = shallow(<Button></Button>);

    expect(component).toMatchSnapshot();
  });
  it('check render component with type', () => {
    const component = shallow(<Button type='submit'></Button>);

    expect(component).toMatchSnapshot();
  });
  it('check render component with onClick', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<Button onClick={mockCallBack}></Button>);

    expect(component).toMatchSnapshot();
  });
});
