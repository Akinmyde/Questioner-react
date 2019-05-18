import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Form from './common/Form';
import meetupSchema from '../schema/meetupSchema';
import { createMeetup } from './services/meetupService';
import { userAnalytics } from './services/userServices';
import exceptionHandler from '../helpers/exceptionHandler';
import Loader from './common/Loader';

class Dashboard extends Form {
  constructor(props) {
    super(props);
    this.state = { analytics: { totalComment: '', totalPost: '', upcomingMeetups: [] }, data: {}, loading: false };
  }

  schema = { ...meetupSchema };

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

  doSubmit = async () => {
    const { data } = this.state;
    this.setState({ loading: true });
    try {
      const meetup = await createMeetup({ ...data });
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  onDelete = () => {
    
  }
  render() {
    const { isAdmin } = this.props;
    const { analytics, loading } = this.state;
    const { totalComment, totalPost, upcomingMeetups } = analytics;
    return (!isAdmin
      ? (
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
      )
      : (
        <React.Fragment>
          <div className="flex">
            <div>
              <p className="lg font22">
                <i className="fas fa-user-plus"> All Meetups</i>
                <br />
                <span id="totalmeetups" />
              </p>
            </div>
            <div>
              <p className="lg font22">
                <i className="fas fa-user-plus"> All Comments</i>
                <br />
                <span id="totalcomments" />
              </p>
            </div>
            <div>
              <p className="lg font22">
                <i className="fas fa-user-plus"> All Questions</i>
                <br />
                <span id="totalquestions" />
              </p>
            </div>
          </div>
          <div className="container" id="create">
            {this.renderInput('topic', 'Topic', 'New meetup')}
            {this.renderInput('location', 'Location', 'Epic tower')}
            {this.renderInput('happeningOn', 'Happening On', '', 'date')}
            {this.renderButton('Add Meetup')}
          </div>
        </React.Fragment>
      )
    );
  }
}

Dashboard.propTypes = {
  isAdmin: propTypes.bool.isRequired,
};

export default Dashboard;
