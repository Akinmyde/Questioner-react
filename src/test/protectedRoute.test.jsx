import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Input from '../components/common/Input';
import ProtectedRoute from '../components/common/protectedRoute';
import Dashboard from '../components/Dashboard';
import SingleMeetupContainer from '../components/containers/SingleMeetupContainer';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = <ProtectedRoute path="/meetups/:id" component={SingleMeetupContainer} />;
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = <ProtectedRoute path="/dashboard" render={(props) => <Dashboard {...props} isAdmin={isAdmin} />} />;
    expect(wrapper).toMatchSnapshot();
  });
});
