import { combineReducers } from 'redux';
import { reducer as formReducer, } from 'redux-form';

import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: usersReducer,
  form: formReducer,
});
