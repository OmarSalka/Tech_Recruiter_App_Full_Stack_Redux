import {
  CHECK_IF_CANDIDATE,
  GET_CANDIDATES,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CHECK_IF_CANDIDATE:
      return {
        ...state
      };
    case GET_CANDIDATES:
      return {
        ...state
      };
    case ADD_CANDIDATE:
      return {
        ...state
      };
    case UPDATE_CANDIDATE:
      return {
        ...state
      };
    case DELETE_CANDIDATE:
      return {
        ...state
      };

    default:
      return { ...state };
  }
};
