import { combineReducers } from 'redux';
import auth from './auth.reducers';
import LoadingReducer from './loading.reducers';
import meetups from './meetups.reducers';

const reducers = combineReducers({ auth, LoadingReducer, meetups });

export default reducers;