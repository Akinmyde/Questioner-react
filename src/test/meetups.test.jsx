import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Meetups from '../components/presentations/Meetups/Meetups';
import Modal from '../components/common/Modal';

describe('Login Page', () => {
  const props = { meetups: { meetupsData: [] }, LoadingReducer: { loader: false }, auth: { isAdmin: false }, showModal: true, currentId: 1 };
  it('should render meetups correctly', async () => {
    const wrapper = shallow(<Meetups { ...props }/>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().onCancel());
    expect(wrapper.instance().onDeleteClick(1));
    expect(wrapper.instance().onDelete(1));
  });
});
