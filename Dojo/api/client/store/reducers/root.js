import authReducer from './authReducer';
import { combineReducers } from 'redux';

const root = combineReducers({
  auth: authReducer,
})

export default root;