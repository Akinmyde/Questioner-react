import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/common/Header';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = <Header />;
    expect(wrapper).toMatchSnapshot();
  });

  it('always find footer', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header'));
  });

  it('always find a div tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('div'));
  });

  it('always find react.fragment', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('React.Fragment'));
  });
});
