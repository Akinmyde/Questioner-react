import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import Dashboard from '../components/Dashboard';

describe('Dashboard Page', () => {
  it('should render dashboard correctly', () => {
    const wrapper = shallow(<Dashboard isAdmin={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state', () => {
    const wrapper = shallow(
      <Dashboard isAdmin={true} />
    );
    expect(wrapper.find('div'));
    expect(wrapper.state('analytics')).toEqual({
      totalComment: '', totalPost: '', upcomingMeetups: [] });
    expect(wrapper.state('data')).toEqual({});
  });

  it('should match snapshot doSubmit', () => {
    const wrapper = renderer.create(<Dashboard isAdmin={false} />);
    const inst = wrapper.getInstance();
    expect(inst.doSubmit()).toMatchSnapshot();
  });

  it('should match snapshot componentDidMount', () => {
    const wrapper = renderer.create(<Dashboard isAdmin={false} />);
    const inst = wrapper.getInstance();
    expect(inst.componentDidMount()).toMatchSnapshot();
  });
});
