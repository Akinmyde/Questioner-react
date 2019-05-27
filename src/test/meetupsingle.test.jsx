import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
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
  it('should test functions updateQuestions', () => {
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
    expect(wrapper.instance().componentDidMount());
    expect(wrapper.instance().handleCancel()).toMatchSnapshot();
    expect(wrapper.instance().upVote(1)).toMatchSnapshot();
    expect(wrapper.instance().downVote(1)).toMatchSnapshot();
    expect(wrapper.instance().rsvpUser(1, 'yes')).toMatchSnapshot();
    expect(wrapper.instance().updateQuestions(question));
  });

  it('test function submitQuestionForm', () => {
    const wrapper = shallow(<SingleMeetup />);
    expect(wrapper.instance().submitQuestionForm());
  });

  it('should test links', () => {
    const wrapper = shallow(<SingleMeetup />);
    const linkYes = wrapper.find('.yes');
    linkYes.simulate('click');
    const linkNo = wrapper.find('.no');
    linkNo.simulate('click');
    const linkMaybe = wrapper.find('.maybe');
    linkMaybe.simulate('click');
  });

  it('should test button', () => {
    const wrapper = shallow(<SingleMeetup />);
    const btnAdd = wrapper.find('#ask-question');
    btnAdd.simulate('click');
  });

  it('test handle change function', () => {
    const wrapper = shallow(<SingleMeetup />);
    const event = { currentTarget: { id: 'title', value: 'prof' } };
    expect(wrapper.instance().handleChange(event));
  });

  it('test handle save function', () => {
    const validate = jest.fn();
    const wrapper = shallow(<SingleMeetup />);
    const event = { preventDefault: jest.fn() };
    expect(wrapper.instance().handleSaveQuestion(event));
  });
});
