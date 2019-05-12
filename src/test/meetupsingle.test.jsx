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

  it('should change state', () => {
    const wrapper = shallow(
      <SingleMeetup />
    );
  });
  it('should test functions', () => {
    const question = {
      body: "qqwe",
      createdby: 2,
      createdon: "2019-04-24T00:00:00.000Z",
      downvotes: 0,
      id: 5,
      meetup: 1,
      title: "Me",
      upvotes: 1
    }
    const wrapper = shallow(<SingleMeetup />);
    expect(wrapper.instance().doSubmit()).toMatchSnapshot();
    expect(wrapper.instance().handleCancel()).toMatchSnapshot();
    expect(wrapper.instance().upVote(1)).toMatchSnapshot();
    expect(wrapper.instance().downVote(1)).toMatchSnapshot();
    expect(wrapper.instance().rsvp(1, 'yes')).toMatchSnapshot();
    expect(wrapper.instance().updateQuestions(question)).toMatchSnapshot();
  });
});
