import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../components/HomePage';

describe('Login Page', () => {
  it('should render login correctly', () => {
    const homepage = shallow(<HomePage />);
    expect(homepage).toMatchSnapshot();
  });
});
