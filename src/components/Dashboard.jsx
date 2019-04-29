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
    const { isAdmin } = this.props;
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
      <div className="flex full flex-buttom-space">
            {upcomingMeetups.map(meetup => (
              <div className="meetup-link" key={meetup.id}>
                <div>
                  <img className="image" src={meetup.images[0]} alt="logo" />
                  <h4><Link className="meetup-link" to={`meetups/${meetup.id}`}>{meetup.topic}</Link></h4>
                  <h6>{meetup.location}</h6>
                  <span className="text-holder">
                    <ul className="details">
                      <li>{new Date(meetup.happeningon).toDateString()}</li>
                      {isAdmin && (
                        <React.Fragment>
                          <li title="delete"><Link to="/meetups" className="delete"><i className="fas fa-trash" /></Link></li>
                          <li title="edit"><Link to="/meetups" className="edit"><i className="fas fa-edit" /></Link></li>
                        </React.Fragment>
                      )}
                    </ul>
                  </span>
                </div>
              </div>
            ))}
          </div>
    </React.Fragment>
    );
  }
}
 
export default Dashboard;