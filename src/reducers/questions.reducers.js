import actionTypes from '../constants/questions.constants';

const initialState = { questionsData: [] };

const questions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_SUCCESS: 
      return {
        ...state,
        questionsData: action.data,
      }
    default: 
      return state;
  } 
};

export default questions;
