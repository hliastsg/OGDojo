import authReducer from './authReducer';
import getDateReducer from './getDateReducer.js'
import { combineReducers } from 'redux';

const root = combineReducers({
  auth: authReducer,
  date: getDateReducer
})

export default root;