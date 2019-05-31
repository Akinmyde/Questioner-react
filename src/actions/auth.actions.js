import actionTypes from '../constants/auth.constants';
import http from '../components/services/httpService';
import exceptionHandler from '../helpers/exceptionHandler';
import contentLoading from './loading.actions';
import { setToken, getCurrentUser, checkIsAdmin } from '../components/services/authService';

export const loginSuccess = (isAdmin, userId) => ({
  type: actionTypes.LOGIN_SUCCESS,
  isAdmin,
  userId,
});

export const signupSuccess = userId => ({
  type: actionTypes.SIGNUP_SUCCESS,
  userId,
});

export const login = (user, props) => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.post('/auth/login', user);
      setToken(result)
      const isAdmin = checkIsAdmin();
      const userId = getCurrentUser();
      dispatch(loginSuccess(isAdmin, userId))
      const { location, history } = props;
      const { state } = location;
      const path = state ? state.from.pathname : '/';
      history.push(path)
    } catch (ex) {
      return exceptionHandler(ex);
    } finally {
      dispatch(contentLoading())
    }
  }
}

export const signup = (user, props) => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.post('/auth/signup', user);
      setToken(result)
      const userId = getCurrentUser();
      dispatch(signupSuccess(userId))
      const { history } = props;
      history.push('/')
    } catch (ex) {
      return exceptionHandler(ex);
    } finally {
      dispatch(contentLoading())
    }
  }
}