import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { toast } from "react-toastify";
import Form from "./common/Form";
import meetupSchema from "../schema/meetupSchema";
import { createMeetup, getAllMeetups } from "./services/meetupService";
import { userAnalytics, getRsvps } from "./services/userServices";
import exceptionHandler from "../helpers/exceptionHandler";
import Loader from "./common/Loader";

class Dashboard extends Form {
  constructor(props) {
    super(props);
    this.state = {
      meetups: 0,
      analytics: { totalComment: "", totalPost: "", upcomingMeetups: [] },
      data: {},
      loading: false,
      rsvps: [],
      showRsvps: false
    };
  }

  schema = { ...meetupSchema };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const analytics = await userAnalytics();
      const allMeetups = await getAllMeetups();
      const rsvps = await getRsvps();
      this.setState({ analytics, meetups: allMeetups.length, rsvps });
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  showRsvps = () => {
    this.setState({ showRsvps: true });
  };

  hideRsvps = () => {
    this.setState({ showRsvps: false });
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.setState({ loading: true });
    try {
      const meetup = await createMeetup({ ...data });
      if (meetup) {
        toast.success("Your meetup has been added");
      }
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const { isAdmin } = this.props;
    const { analytics, loading, showRsvps, rsvps } = this.state;
    const { totalComment, totalPost, upcomingMeetups } = analytics;
    console.log(rsvps);
    return !isAdmin ? (
      <React.Fragment>
        {loading && <Loader />}
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
                  rsvps.length
                } Meetups you plan to attend`}</i>
              </Link>
            </p>
          </div>
        </div>
        {showRsvps && (
          <div className="flex meetup-card">
            {rsvps.map(meetup => (
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
        {loading && <Loader />}
        <div className="sum">
          <div>
            <p className="lg font22">
              <i className="fas fa-user-plus">
                All Meetups {this.state.meetups}
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
