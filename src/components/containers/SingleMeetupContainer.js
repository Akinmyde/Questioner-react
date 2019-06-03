import { connect } from 'react-redux';
import SingleMeetup from '../presentations/SingleMeetup/SingleMeetup';
import { getMeetupQuestions, upVoteQuestion, downVoteQuestion, addQuestion } from '../../actions/questions.actions';
import { getSingleMeetup, rsvps } from '../../actions/meetups.actions';

const mapStateToProps = ({ auth, LoadingReducer, meetups, questions }) => ({ auth, LoadingReducer, meetups, questions })

const SingleMeetupContainer = connect(mapStateToProps, { getMeetupQuestions, getSingleMeetup, rsvps, upVoteQuestion, addQuestion, downVoteQuestion })(SingleMeetup)

export default SingleMeetupContainer;
