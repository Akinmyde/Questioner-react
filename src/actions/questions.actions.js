import actionTypes from '../constants/questions.constants';
import http from '../components/services/httpService';
import exceptionHandler from '../helpers/exceptionHandler';
import contentLoading from './loading.actions';

export const questionsSuccess = data => ({
  type: actionTypes.QUESTION_SUCCESS,
  data,
});

export const getMeetupQuestions = id => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.get(`/meetups/${id}/questions`);
      const { data } = result;
      console.log(data);
      dispatch(questionsSuccess(data));
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}