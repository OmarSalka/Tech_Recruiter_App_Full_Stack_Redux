import React, { useReducer } from 'react';
import axios from 'axios';
import CandidateContext from './candidateContext';
import CandidateReducer from './CandidateReducer';

import {
  GET_CANDIDATE,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE
} from '../types';

const CandidateState = props => {
  const initialState = {};

  const [state, dispatch] = useReducer(CandidateReducer, initialState);

  return (
    <CandidateState.Provider value={{}}>
      {props.children}
    </CandidateState.Provider>
  );
};

export default CandidateState;
