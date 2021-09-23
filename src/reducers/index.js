import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import { usersReducers } from './usersReducers';

export default combineReducers({
  posts: postReducer,
  users: usersReducers
});
