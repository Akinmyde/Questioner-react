import actiontype from '../constants/auth.constants';

const initialState = { isAdmin: false, userId: null };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.LOGIN_SUCCESS:
      return {
        ...state,
        isAdmin: action.isAdmin, 
        userId: action.userId,
      };
    case actiontype.SIGNUP_SUCCESS:
        return {
          ...state,
          userId: action.userId,
        };
    default:
      return state;
  }
};

export default auth;