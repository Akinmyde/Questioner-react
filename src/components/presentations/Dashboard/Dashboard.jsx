import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import Form from "../../common/Form";
import meetupSchema from "../../../schema/meetupSchema";
import Loader from "../../common/Loader";

class Dashboard extends Form {
  constructor(props) {
    super(props);
    this.state = { data: {}, showRsvps: false };
  }

  schema = { ...meetupSchema };

  async componentDidMount() {
    const { fetchUpcomingMeetups, fetchRsvpMeetups, getAllMeetups } = this.props;
      await getAllMeetups();
      await fetchUpcomingMeetups();
      await fetchRsvpMeetups();
    }

  showRsvps = async () => {
    this.setState({ showRsvps: true });
    const { fetchRsvpMeetups } = this.props;
    await fetchRsvpMeetups();
  };

  hideRsvps = () => {
    this.setState({ showRsvps: false });
  };

  doSubmit = async () => {
    const { data } = this.state;
    const { createMeetup } = this.props;
    await createMeetup({ ...data });
  };

  render() {
    const { meetups, LoadingReducer, auth } = this.props;
    const { isAdmin } = auth;
    const { upcomingMeetups, rsvpMeetups, meetupsData } = meetups;
    const { loader } = LoadingReducer;
    const { showRsvps } = this.state;
    return !isAdmin ? (
      <React.Fragment>
        {loader && <Loader />}
        <div className="sum">
          <div>
            <p className="lg font22">
              <Link className="imp" onClick={this.hideRsvps}>
                <i className="fas fa-users">{`${
                  upcomingMeetups.length
                } Top upcoming Meetups you may wish to attend`}</i>
              </Link>
            </p>
          </div>
          <div>
            <p className="lg font22">
              <Link className="imp" onClick={this.showRsvps}>
                <i className="fas fa-users">{`${
                  rsvpMeetups.length
                } Meetups you plan to attend`}</i>
              </Link>
            </p>
          </div>
        </div>
        {showRsvps && (
          <div className="flex meetup-card">
            {rsvpMeetups.map(meetup => (
              <div className="meetup-link" key={meetup.id}>
                <div>
                  <img className="image" src={meetup.images[0]} alt="logo" />
                  <h4>
                    <Link className="meetup-link" to={`meetups/${meetup.id}`}>
                      {meetup.topic}
                    </Link>
                  </h4>
                  <h6>{meetup.location}</h6>
                  <span className="text-holder">
                    <ul className="details">
                      <li>{new Date(meetup.happeningon).toDateString()}</li>
                      {isAdmin && (
                        <React.Fragment>
                          <li title="delete">
                            <Link to="/meetups" className="delete">
                              <i className="fas fa-trash" />
                            </Link>
                          </li>
                          <li title="edit">
                            <Link to="/meetups" className="edit">
                              <i className="fas fa-edit" />
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                    </ul>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {!showRsvps && (
          <div className="flex meetup-card">
            {upcomingMeetups.map(meetup => (
              <div className="meetup-link" key={meetup.id}>
                <div>
                  <img className="image" src={meetup.images[0]} alt="logo" />
                  <h4>
                    <Link className="meetup-link" to={`meetups/${meetup.id}`}>
                      {meetup.topic}
                    </Link>
                  </h4>
                  <h6>{meetup.location}</h6>
                  <span className="text-holder">
                    <ul className="details">
                      <li>{new Date(meetup.happeningon).toDateString()}</li>
                      {isAdmin && (
                        <React.Fragment>
                          <li title="delete">
                            <Link to="/meetups" className="delete">
                              <i className="fas fa-trash" />
                            </Link>
                          </li>
                          <li title="edit">
                            <Link to="/meetups" className="edit">
                              <i className="fas fa-edit" />
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                    </ul>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {loader && <Loader />}
        <div className="sum">
          <div>
            <p className="lg font22">
              <i className="fas fa-user-plus">
                All Meetups {meetupsData.length}
              </i>
              <br />
              <span id="totalmeetups" />
            </p>
          </div>
        </div>
        <div className="container" id="create">
          {this.renderInput("topic", "Topic", "New meetup")}
          {this.renderInput("location", "Location", "Epic tower")}
          {this.renderInput("happeningOn", "Happening On", "", "date")}
          {this.renderButton("Add Meetup")}
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  isAdmin: propTypes.bool.isRequired
};

export default Dashboard;
