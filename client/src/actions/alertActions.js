import { SET_ALERT, REMOVE_ALERT } from './types';
// import uuid from 'uuid';

export const setAlert = (msg, type, timeout = 3000) => dispatch => {
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT });
  }, timeout);
  dispatch({
    type: SET_ALERT,
    payload: { msg, type }
  });
};
// export const setAlert = (msg, type, timeout = 3000) => {
//   const id = uuid.v4();
//   setTimeout(() => {
//     return { type: REMOVE_ALERT, payload: id };
//   }, timeout);
//   return {
//     type: SET_ALERT,
//     payload: { msg, type, id }
//   };
// };
