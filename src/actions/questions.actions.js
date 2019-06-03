import { toast } from 'react-toastify';
import actionTypes from '../constants/questions.constants';
import http from '../services/httpService';
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

export const addQuestionSuccess = data => ({
  type: actionTypes.ADD_QUESTION_SUCCESS,
  data,
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

export const addQuestion = questionData => {
  return async dispatch => {
    dispatch(contentLoading());
    try {
      const { data: result } = await http.post('/questions', questionData);
      const { data } = result;
      console.log(data);
      dispatch(addQuestionSuccess(data[0]));
      toast.success('Your question has been added');
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading())
    }
  }
}