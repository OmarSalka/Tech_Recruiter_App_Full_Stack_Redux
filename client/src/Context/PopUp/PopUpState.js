import React, { useReducer } from 'react';
import PopUpContext from './popUpContext';
import PopUpReducer from './PopUpReducer';

import {
  DISPLAY,
  NO_DISPLAY,
  ADD_POP_UP,
  DELETE_POP_UP,
  CLEAR_POP_UPS
} from '../types';

const PopUpState = props => {
  const initialState = {
    popUpType: null,
    candidateToBeAdded: false,
    login: null,
    id: null,
    candidateToBeDeleted: false,
    editNotes: false,
    candidateToBeUpdated: null
  };

  const [state, dispatch] = useReducer(PopUpReducer, initialState);

  const toggleDisplay = (boolean, id) => {
    if (boolean) {
      dispatch({
        type: DISPLAY,
        payload: id
      });
    } else {
      dispatch({
        type: NO_DISPLAY,
        payload: id
      });
    }
  };

  const addCandidatePopUp = (name, id, login) => {
    dispatch({
      type: ADD_POP_UP,
      payload: { name, id, login }
    });
  };
  const deleteCandidatePopUp = (name, id) => {
    dispatch({
      type: DELETE_POP_UP,
      payload: { name, id }
    });
  };

  //Clear PopUps
  const clearPopUps = () => dispatch({ type: CLEAR_POP_UPS });

  return (
    <PopUpContext.Provider
      value={{
        popUpType: state.popUpType,
        addPopUp: state.addPopUp,
        candidateToBeAdded: state.candidateToBeAdded,
        login: state.login,
        id: state.id,
        candidateToBeDeleted: state.candidateToBeDeleted,
        editNotes: state.editNotes,
        candidateToBeUpdated: state.candidateToBeUpdated,
        toggleDisplay,
        addCandidatePopUp,
        deleteCandidatePopUp,
        clearPopUps
      }}
    >
      {props.children}
    </PopUpContext.Provider>
  );
};

export default PopUpState;
