import React from 'react';
import { shallow } from 'enzyme';
import Input from '../components/common/Input';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = <Input id={"id"} label={"olu"} />;
    expect(wrapper).toMatchSnapshot();
  });

  it('always find div', () => {
    const wrapper = shallow(<Input id={"id1"} label={"olu"} />);
    expect(wrapper.find('div'));
  });
});
