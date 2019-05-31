import { combineReducers } from 'redux';
import auth from './auth.reducers';
import LoadingReducer from './loading.reducers';

const reducers = combineReducers({ auth, LoadingReducer });

export default reducers;