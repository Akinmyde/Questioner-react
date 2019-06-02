import { toast } from 'react-toastify';
import actionTypes from '../constants/questions.constants';
import http from '../components/services/httpService';
import exceptionHandler from '../helpers/exceptionHandler';
import contentLoading from './loading.actions';

export const questionsSuccess = data => ({
  type: actionTypes.QUESTION_SUCCESS,
  data,
});

export const upvoteSuccess = (upvotes, id) => ({
  type: actionTypes.UPVOTE_SUCCESS,
  upvotes,
  id
});

export const downvoteSuccess = (downvotes, id) => ({
  type: actionTypes.DOWNVOTE_SUCCESS,
  downvotes,
  id
});

export const getMeetupQuestions = id => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.get(`/meetups/${id}/questions`);
      const { data } = result;
      dispatch(questionsSuccess(data));
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}

export const upVoteQuestion = id => {
  return async dispatch => {
    try {
      const { data: result } = await http.patch(`questions/${id}/upvote`);
      const { data } = result;
      dispatch(upvoteSuccess(data[0].upvotes, id))
      toast.success('you have successfully up vote this question');
    } catch (ex) {
      exceptionHandler(ex);
    }
  }
}

export const downVoteQuestion = id => {
  return async dispatch => {
    try {
      const { data: result } = await http.patch(`questions/${id}/downvote`);
      const { data } = result;
      dispatch(downvoteSuccess(data[0].downvotes, id))
      toast.success('you have successfully down vote this question');
    } catch (ex) {
      exceptionHandler(ex);
    }
  }
}