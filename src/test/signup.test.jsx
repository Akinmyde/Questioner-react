import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../components/presentations/Signup/Signup';

describe('Signup component', () => {
  it('should match snapshot', async () => {
    const props = { LoadingReducer: { loader: false }, auth: { userId: 1 } };
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'));
    expect(wrapper.instance().doSubmit());
  });

  it('should test case null ID', async () => {
    const props = { LoadingReducer: { loader: false }, auth: { userId: null } };
    const wrapper = shallow(<Signup {...props} />);
  });
});
