import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { userAnalytics } from './services/userServices';
import exceptionHandler from '../helpers/exceptionHandler';
import Loader from './common/Loader';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { analytics: { totalComment: '', totalPost: '', upcomingMeetups: [] }, loading: false };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const analytics = await userAnalytics();
      this.setState({ analytics });
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() { 
    const { analytics, loading } = this.state;
    const { totalComment, totalPost, upcomingMeetups } = analytics;
    return (
      <React.Fragment>
      {loading && <Loader />}
      <div className="flex">
        <div><p className="lg font22"><i className="fas fa-user-plus">{`${totalPost} Posts`}</i></p></div>
        <div><p className="lg font22"><i className="fas fa-comment">{`${totalComment} Comments`}</i></p></div>
        <div><p className="lg font22"><i className="fas fa-users">{`${upcomingMeetups.length} upcoming meetups`}</i></p></div>
      </div>
    </React.Fragment>
    );
  }
}
 
export default Dashboard;