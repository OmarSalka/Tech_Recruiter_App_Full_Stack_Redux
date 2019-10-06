import {
  NO_CANDIDATES_FOUND,
  SET_LOADING,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
  CLEAR_VERIFIER,
  GET_CANDIDATES,
  // GET_SINGLE_CANDIDATE,
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
        filterType: 'and'
      };
    case OR:
      return {
        ...state,
        filterType: 'or'
      };
    case IS_CANDIDATE:
      return {
        ...state,
        isCandidate: true,
        loading: false
      };
    case NOT_CANDIDATE:
      return {
        ...state,
        isCandidate: false,
        loading: false
      };
    case CLEAR_VERIFIER:
      return {
        ...state,
        isCandidate: null
      };
    case GET_CANDIDATES:
      return {
        ...state,
        loading: false,
        candidates: action.payload,
        emptyFilter: null
      };
    // case GET_SINGLE_CANDIDATE:
    //   return {
    //     ...state,
    //     loading: false,
    //     candidate: [...state.candidate, action.payload]
    //   };
    case NO_CANDIDATES_FOUND:
      return {
        ...state,
        loading: false,
        emptyFilter: true
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
