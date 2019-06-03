import { connect } from 'react-redux';
import { fetchUpcomingMeetups, fetchRsvpMeetups, getAllMeetups, createMeetup } from '../../actions/meetups.actions';
import DashBoard from '../presentations/Dashboard/Dashboard';


const mapStateToProps = ({ auth, LoadingReducer, meetups }) => ({ auth, LoadingReducer, meetups });

const DashBoardContainer = connect(mapStateToProps, { fetchUpcomingMeetups, fetchRsvpMeetups, getAllMeetups, createMeetup })(DashBoard);

export default DashBoardContainer;
