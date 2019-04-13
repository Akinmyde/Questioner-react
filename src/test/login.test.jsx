import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';

describe('Login Page', () => {
  it('should render login correctly', () => {
    const app = shallow(<Login />);
    expect(app).toMatchSnapshot();
  });
});
