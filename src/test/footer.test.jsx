import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/common/Footer';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = <Footer />;
    expect(wrapper).toMatchSnapshot();
  });

  it('always find footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer'));
  });

  it('always find a p tag', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p'));
  });
});
