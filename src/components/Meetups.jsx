import React, { Component } from 'react';
import Card from './common/Card';
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
            <Card
              key={meetup.id}
              id={meetup.id}
              location={meetup.location}
              date={new Date(meetup.happeningon).toDateString()}
              title={meetup.topic}
              imageUrl={meetup.images[0]}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Meetups;
