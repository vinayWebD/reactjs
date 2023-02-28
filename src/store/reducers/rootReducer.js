import { combineReducers } from 'redux';
import apiFetch from './apiFetch/apiFetch.js';
import authentication from './authentication/authentication.js';
import quiz from './quiz/quiz.js';
import todoLists from './todolists/todoLists';

const rootReducer = combineReducers({
  authentication: authentication,
  todoLists: todoLists,
  quiz: quiz,
  apiFetch: apiFetch,
});

export default rootReducer;
