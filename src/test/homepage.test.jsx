import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../components/presentations/HomePage/HomePage';

describe('Login Page', () => {
  it('should render Homepage correctly', () => {
    const homepage = shallow(<HomePage />);
    expect(homepage).toMatchSnapshot();
  });
});
