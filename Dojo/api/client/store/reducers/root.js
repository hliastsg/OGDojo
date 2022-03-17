import authReducer from './authReducer';
import { combineReducers } from 'redux';
import getUserReducer from './getUserReducer';

const root = combineReducers({
  auth: authReducer,
  getUser: getUserReducer
})

export default root;