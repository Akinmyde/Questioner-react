import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Landing Page', () => {
  it('should render app correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});

describe('Landing Page', () => {
  it('should render app correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
