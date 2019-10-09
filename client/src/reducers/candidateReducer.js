import {
  SET_LOADING_CANDIDATES,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
  CLEAR_VERIFIER,
  DISPLAY_CLEAR_BTN,
  MASK_CLEAR_BTN,
  GET_CANDIDATES,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
  NO_CANDIDATES_FOUND
} from '../actions/types';

const initialState = {
  isCandidate: null,
  filterType: 'and',
  loading: false,
  clearButton: false,
  candidates: [],
  emptyFilterResults: null,
  candidate: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_CANDIDATES:
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
    case DISPLAY_CLEAR_BTN:
      return {
        ...state,
        clearButton: true
      };
    case MASK_CLEAR_BTN:
      return {
        ...state,
        clearButton: false
      };
    case GET_CANDIDATES:
      return {
        ...state,
        loading: false,
        candidates: action.payload,
        emptyFilterResults: null
      };
    case NO_CANDIDATES_FOUND:
      return {
        ...state,
        loading: false,
        emptyFilterResults: true
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
