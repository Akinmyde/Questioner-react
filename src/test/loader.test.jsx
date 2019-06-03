import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../components/common/Loader';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'))
  });
});
