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
    expect(wrapper.state('meetups')).toEqual(0);
  });

  it('should match snapshot doSubmit', () => {
    const wrapper = shallow(<Dashboard isAdmin={false} />);
    const inst = wrapper.instance();
    expect(wrapper.state('loading')).toEqual(true);
    expect(inst.doSubmit()).toMatchSnapshot();
  });

  it('should match snapshot componentDidMount', () => {
    const wrapper = shallow(<Dashboard isAdmin={false} />);
    const inst = wrapper.instance();
    expect(inst.componentDidMount()).toMatchSnapshot();
  });

  it('should match snapshot showRsvps', () => {
    const wrapper = shallow(<Dashboard isAdmin={false} />);
    const inst = wrapper.instance();
    expect(inst.showRsvps()).toMatchSnapshot();
  });

  it('should match snapshot hideRsvps', () => {
    const wrapper = shallow(<Dashboard isAdmin={false} />);
    const inst = wrapper.instance();
    expect(inst.hideRsvps()).toMatchSnapshot();
  });
});
