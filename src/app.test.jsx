import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/extensions
import App from './App.jsx';

describe('Landing Page', () => {
  it('should render app correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
