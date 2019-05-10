import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import SingleMeetup from '../components/SingleMeetup';

describe('Meetups Page', () => {
  it('should render signup correctly', () => {
    const meetup = shallow(<SingleMeetup />);
    expect(meetup).toMatchSnapshot();
  });


  it('should change state', () => {
    const wrapper = shallow(
      <SingleMeetup  />
    );
    expect(wrapper.find('div'));
  });
});
