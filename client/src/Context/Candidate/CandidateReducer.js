import {
  NO_CANDIDATES_FOUND,
  SET_LOADING,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
  GET_CANDIDATES,
  GET_SINGLE_CANDIDATE,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case AND:
      return {
        ...state,
        and: true,
        or: false
      };
    case OR:
      return {
        ...state,
        and: false,
        or: true
      };
    case IS_CANDIDATE:
      return {
        ...state
      };
    case GET_CANDIDATES:
      return {
        ...state,
        loading: false,
        candidates: action.payload
      };
    case GET_SINGLE_CANDIDATE:
      return {
        ...state,
        loading: false,
        candidate: [...state.candidate, action.payload]
      };
    case NO_CANDIDATES_FOUND:
      return {
        ...state,
        loading: false
      };
    case ADD_CANDIDATE:
      return {
        ...state,
        addPopUp: true
      };
    case UPDATE_CANDIDATE:
      return {
        ...state
      };
    case DELETE_CANDIDATE:
      return {
        ...state,
        deletePopUp: true
      };

    default:
      return { ...state };
  }
};
