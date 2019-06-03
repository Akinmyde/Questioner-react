import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../components/common/Modal';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const props = { message: 'test', onDelete: jest.fn(), onCancel: jest.fn() }
    const wrapper = shallow(<Modal {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'))
  });
});
