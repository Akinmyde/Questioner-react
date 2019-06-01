import { connect } from 'react-redux';
import Meetups from '../presentations/Meetups/Meetups';
import { getAllMeetups, deleteMeetup } from '../../actions/meetups.actions'

const mapStateToProps = ({auth, LoadingReducer, meetups}) => ({auth, LoadingReducer, meetups})

const MeetupsContainer = connect(mapStateToProps, { getAllMeetups, deleteMeetup })(Meetups)

export default MeetupsContainer;
