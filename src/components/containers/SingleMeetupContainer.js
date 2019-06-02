import { connect } from 'react-redux';
import SingleMeetup from '../presentations/SingleMeetup/SingleMeetup';
import { getMeetupQuestions } from '../../actions/questions.actions';
import { getSingleMeetup, rsvps } from '../../actions/meetups.actions';

const mapStateToProps = ({auth, LoadingReducer, meetups, questions}) => ({auth, LoadingReducer, meetups, questions})

const SingleMeetupContainer = connect(mapStateToProps, { getMeetupQuestions, getSingleMeetup, rsvps })(SingleMeetup)

export default SingleMeetupContainer;
