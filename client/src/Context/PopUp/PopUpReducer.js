import { ADD_POP_UP, DELETE_POP_UP, CLEAR_POP_UPS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_POP_UP:
      return {
        ...state,
        candidateToBeAdded: action.payload.name,
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
        popUpType: null
      };
    default:
      return {
        ...state
      };
  }
};
