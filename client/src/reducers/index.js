import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import candidateReducer from './candidateReducer';
import githubReducer from './githubReducer';
import popUpReducer from './popUpReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  candidate: candidateReducer,
  github: githubReducer,
  popUp: popUpReducer
});
