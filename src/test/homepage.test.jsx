import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../components/presentations/HomePage/HomePage';

describe('Login Page', () => {
  it('should render login correctly', () => {
    const homepage = shallow(<homepage />);
    expect(homepage).toMatchSnapshot();
  });
});
