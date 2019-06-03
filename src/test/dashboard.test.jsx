import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../components/presentations/Dashboard/Dashboard';

describe('HomePage component', () => {
  const props = { meetups: { upcomingMeetups: [], rsvpMeetups: [], }, LoadingReducer: { loader: false }, auth: {isAdmin: false} };
  it('should match snapshot', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'));
    expect(wrapper.instance().showRsvps());
    expect(wrapper.instance().hideRsvps());
    expect(wrapper.instance().doSubmit());
    expect(wrapper.instance().componentDidMount());
  });
});
