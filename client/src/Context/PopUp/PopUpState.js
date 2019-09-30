import React, { useReducer } from 'react';
// import axios from 'axios';
import PopUpContext from './popUpContext';
import PopUpReducer from './PopUpReducer';

import { ADD_POP_UP, DELETE_POP_UP, CLEAR_POP_UPS } from '../types';

const PopUpState = props => {
  const initialState = {
    popUpType: null,
    candidateToBeAdded: false,
    id: null,
    candidateToBeDeleted: false
  };

  const [state, dispatch] = useReducer(PopUpReducer, initialState);

  const addCandidatePopUp = (name, id) => {
    dispatch({
      type: ADD_POP_UP,
      payload: { name, id }
    });
  };
  const deleteCandidatePopUp = (name, id) => {
    dispatch({
      type: DELETE_POP_UP,
      payload: { name, id }
    });
  };
  const candidateProfilePopUp = (name, id) => {
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
        id: state.id,
        candidateToBeDeleted: state.candidateToBeDeleted,
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
