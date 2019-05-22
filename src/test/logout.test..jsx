import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../components/common/Logout';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = <Logout />;
    expect(wrapper).toMatchSnapshot();
  });

  it('always renders null', () => {
    const wrapper = shallow(<Logout />).toMatchSnapshot();
  });

  it('should match snapshot componentDidMount', () => {
    const wrapper = renderer.create(<Logout />);
    const inst = wrapper.getInstance();
    expect(inst.componentDidMount());
  });
});
