import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import Meetups from '../components/Meetups';

describe('Meetups Page', () => {
  it('should render signup correctly', () => {
    const meetups = shallow(<Meetups />);
    expect(meetups).toMatchSnapshot();
  });

  it('should match snapshot componentDidMount', () => {
    const wrapper = renderer.create(<Meetups />);
    const inst = wrapper.getInstance();
    expect(inst.componentDidMount());
  });

  it('should have onDelete function', () => {
    const wrapper = renderer.create(<Meetups />);
    const inst = wrapper.getInstance();
    expect(inst.onDelete(1));
  });

  it('should have onDeleteClick function', () => {
    const wrapper = renderer.create(<Meetups />);
    const inst = wrapper.getInstance();
    expect(inst.onDeleteClick());
  });

  it('should have onCancel function', () => {
    const wrapper = renderer.create(<Meetups />);
    const inst = wrapper.getInstance();
    expect(inst.onCancel());
  });

  it('should change state', () => {
    const wrapper = shallow(
      <Meetups  />
    );
    expect(wrapper.find('div'));
    expect(wrapper.state()).toEqual({
      meetups: [], isAdmin: false, loading: true, showModal: false, currentId: null });
  });
});
