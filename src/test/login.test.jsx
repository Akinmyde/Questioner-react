import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer'
import Login from '../components/Login';

describe('Login Page', () => {
  it('should render login correctly', () => {
    const app = shallow(<Login />);
    expect(app).toMatchSnapshot();
  });

  // it('should match snapshot componentDidMount', () => {
  //   const wrapper = renderer.create(<Login />);
  //   const inst = wrapper.getInstance();
  //   expect(inst.componentDidMount()).toMatchSnapshot();
  // });

  it('should change state', () => {
    const wrapper = shallow(
      <Login />
    );
    expect(wrapper.state('data')).toEqual({ email: '', password: '' });
  });
});
