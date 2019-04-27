import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkIsAdmin } from './services/authService';
import { getAllMeetups } from './services/meetupService';
import Loader from './common/Loader';
import exceptionHandler from '../helpers/exceptionHandler';

class Meetups extends Component {
  constructor(props) {
    super(props);
    this.state = { meetups: [], isAdmin: false, loading: false };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const isAdmin = checkIsAdmin();
      const meetups = await getAllMeetups();
      this.setState({ meetups, isAdmin });
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { meetups, isAdmin, loading } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        <div className="flex meetup-card">
          {meetups.map(meetup => (
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

export default Meetups;
