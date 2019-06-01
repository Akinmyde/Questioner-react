import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import Modal from '../../common/Modal';

class Meetups extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, currentId: null };
  }

  async componentDidMount() {
    const { getAllMeetups } = this.props;
    await getAllMeetups();
  }

  onDelete = async (meetupId) => {
    const { deleteMeetup } = this.props;
    await deleteMeetup(meetupId);
    this.setState({ showModal: false });
  };

  onDeleteClick = (id) => {
    this.setState({ showModal: true, currentId: id });
  }

  onCancel = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, currentId } = this.state;
    const { auth, LoadingReducer, meetups } = this.props;
    const { isAdmin } = auth;
    const { loader } = LoadingReducer;
    const { meetupsData } = meetups;
    return (
      <React.Fragment>
        {showModal && <Modal
          message='are you sure you want to delete'
          onDelete={() => {this.onDelete(currentId)}}
          onCancel={this.onCancel}
        /> }
        {loader && <Loader />}
        <div className="flex meetup-card">
          {meetupsData.map(meetup => (
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
                        <li title="delete"><Link onClick={() => {this.onDeleteClick(meetup.id)}} className="delete"><i className="fas fa-trash" /></Link></li>
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
