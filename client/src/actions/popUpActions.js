import {
  DISPLAY,
  NO_DISPLAY,
  ADD_POP_UP,
  DELETE_POP_UP,
  CLEAR_POP_UPS
} from './types';

// Control display of popUps
export const toggleDisplay = (boolean, id) => {
  if (boolean) {
    return {
      type: DISPLAY,
      payload: id
    };
  } else {
    return {
      type: NO_DISPLAY,
      payload: id
    };
  }
};

// Create state for add popUp to be used later to add candidate via api in candidates action
export const addCandidatePopUp = (name, id, login) => {
  return {
    type: ADD_POP_UP,
    payload: { name, id, login }
  };
};

// Create state for delete popUp to be used later to delete candidate via api in candidates action
export const deleteCandidatePopUp = (name, id) => {
  return {
    type: DELETE_POP_UP,
    payload: { name, id }
  };
};

//Clear PopUps
export const clearPopUps = () => {
  return { type: CLEAR_POP_UPS };
};
