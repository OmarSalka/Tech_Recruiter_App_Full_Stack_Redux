import { SET_ALERT, REMOVE_ALERT } from './types';

//Set Alert
export const setAlert = (msg, type, timeout = 3000) => dispatch => {
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT });
  }, timeout);
  dispatch({
    type: SET_ALERT,
    payload: { msg, type }
  });
};
