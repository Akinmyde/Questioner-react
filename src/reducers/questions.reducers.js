import actionTypes from '../constants/questions.constants';

const initialState = { questionsData: [] };

const upvoteQuestions = (questions, upvotes, id) => {
  questions.map(question => {
    if (question.id === id) {
      question.upvotes = upvotes;
      if (question.downvotes > 0) {
        question.downvotes -= 1;
      }
    }
    return question;
  })
  return questions;
}

const downvoteQuestions = (questions, downvotes, id) => {
  questions.map(question => {
    if (question.id === id) {
      question.downvotes = downvotes;
      if (question.upvotes > 0) {
        question.upvotes -= 1;
      }
    }
    return question;
  })
  return questions;
}

const questions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_SUCCESS: 
      return {
        ...state,
        questionsData: action.data,
      }
    case actionTypes.UPVOTE_SUCCESS: 
      return {
        ...state,
        questionsData: upvoteQuestions(state.questionsData, action.upvotes, action.id),
      }
    case actionTypes.DOWNVOTE_SUCCESS: 
    console.log(action.id, '.......id......')
    return {
      ...state,
      questionsData: downvoteQuestions(state.questionsData, action.downvotes, action.id),
    }
    default: 
      return state;
  } 
};

export default questions;
