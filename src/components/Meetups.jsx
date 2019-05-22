import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkIsAdmin } from './services/authService';
import { getAllMeetups, deleteMeetup } from './services/meetupService';
import Loader from './common/Loader';
import exceptionHandler from '../helpers/exceptionHandler';
import Modal from './common/Modal';

class Meetups extends Component {
  constructor(props) {
    super(props);
    this.state = { meetups: [], isAdmin: false, loading: false, showModal: false, currentId: null };
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

  onDelete = async (id) => {
    const { meetups } = this.state;
    try {
      const newMeetups = meetups.filter(x => x.id !== id) 
      this.setState({ meetups: newMeetups, showModal: false });
      await deleteMeetup(id);
    } catch(ex) {
      this.setState({ meetups });
      exceptionHandler(ex);
    }
  };

  onDeleteClick = (id) => {
    this.setState({ showModal: true, currentId: id });
  }

  onCancel = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { meetups, isAdmin, loading, showModal, currentId } = this.state;
    return (
      <React.Fragment>
        {showModal && <Modal
          message='are you sure you want to delete'
          onDelete={() => {this.onDelete(currentId)}}
          onCancel={this.onCancel}
        /> }
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
                        <li title="delete"><Link onClick={() => {this.onDeleteClick(meetup.id)}} className="delete"><i className="fas fa-trash" /></Link></li>
                        <li title="edit"><Link className="edit"><i className="fas fa-edit" /></Link></li>
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
