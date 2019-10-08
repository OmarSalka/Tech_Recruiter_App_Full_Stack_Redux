import {
  DISPLAY,
  NO_DISPLAY,
  ADD_POP_UP,
  DELETE_POP_UP,
  CLEAR_POP_UPS
} from '../actions/types';

const initialState = {
  popUpType: null,
  candidateToBeAdded: false,
  login: null,
  id: null,
  candidateToBeDeleted: false,
  editNotes: false,
  candidateToBeUpdated: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY:
      return {
        ...state,
        editNotes: true,
        candidateToBeUpdated: action.payload
      };
    case NO_DISPLAY:
      return {
        ...state,
        editNotes: false,
        candidateToBeUpdated: null
      };
    case ADD_POP_UP:
      return {
        ...state,
        candidateToBeAdded: action.payload.name,
        login: action.payload.login,
        id: action.payload.id,
        popUpType: 'add'
      };
    case DELETE_POP_UP:
      return {
        ...state,
        candidateToBeDeleted: action.payload.name,
        id: action.payload.id,
        popUpType: 'delete'
      };
    case CLEAR_POP_UPS:
      return {
        ...state,
        candidateToBeAdded: false,
        candidateToBeDeleted: false,
        id: null,
        login: null,
        popUpType: null
      };
    default:
      return {
        ...state
      };
  }
};
