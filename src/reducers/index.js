import { combineReducers } from 'redux';
import auth from './auth.reducers';
import LoadingReducer from './loading.reducers';
import meetups from './meetups.reducers';
import questions from './questions.reducers';

const reducers = combineReducers({ auth, LoadingReducer, meetups, questions });

export default reducers;