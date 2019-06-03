import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import SingleMeetup from '../components/presentations/SingleMeetup/SingleMeetup';

describe('Signup component', () => {
  const props = { LoadingReducer: { loader: false }, questions: { questionsData: [] }, meetups: { singleMeetupData: [] } };
  it('should match snapshot', async () => {
    const wrapper = shallow(<SingleMeetup {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'));
    expect(wrapper.instance().rsvpUser(1, 'yes'));
    expect(wrapper.instance().downVote(1));
    expect(wrapper.instance().upVote(1));
    expect(wrapper.instance().handleCancel());
    expect(wrapper.instance().submitQuestionForm());
  });

  it('should test links', () => {
    const wrapper = shallow(<SingleMeetup {...props} />);
    const linkYes = wrapper.find('.yes');
    linkYes.simulate('click');
    const linkNo = wrapper.find('.no');
    linkNo.simulate('click');
    const linkMaybe = wrapper.find('.maybe');
    linkMaybe.simulate('click');
  });

  it('should test button', () => {
    const wrapper = shallow(<SingleMeetup {...props} />);
    const btnAdd = wrapper.find('#ask-question');
    btnAdd.simulate('click');
  });

  it('test handle change function', () => {
    const wrapper = shallow(<SingleMeetup {...props} />);
    const event = { currentTarget: { id: 'title', value: 'prof' } };
    expect(wrapper.instance().handleChange(event));
  });

  it('test handle save function', () => {
    const validate = jest.fn();
    const wrapper = shallow(<SingleMeetup {...props} />);
    const event = { preventDefault: jest.fn() };
    expect(wrapper.instance().handleSaveQuestion(event));
  });
});
