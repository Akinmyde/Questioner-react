import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../components/Signup';

describe('Signup Page', () => {
  it('should render signup correctly', () => {
    const signup = shallow(<Signup />);
    expect(signup).toMatchSnapshot();
  });
});
