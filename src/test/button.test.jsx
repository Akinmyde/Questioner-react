import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/common/Button';

describe('Button Test', () => {
  it('should render button correctly', () => {
    const button = shallow(<Button id="test" value="text" onClick={() => {console.log('this is clicked')}} />);
    expect(button).toMatchSnapshot();
    expect(button.hasClass('btn'))
    expect(button.text='text')
  });
});
