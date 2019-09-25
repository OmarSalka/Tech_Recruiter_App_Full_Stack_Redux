import React, { useReducer } from 'react';
import axios from 'axios';
import CandidateContext from './candidateContext';
import CandidateReducer from './CandidateReducer';

import {
  CHECK_IF_CANDIDATE,
  GET_CANDIDATES,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE
} from '../types';

let githubClientId;
let githubClientSecrect;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecrect = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecrect = process.env.GITHUB_CLIENT_SECRET;
}

const CandidateState = props => {
  const initialState = {};

  const [state, dispatch] = useReducer(CandidateReducer, initialState);

  const checkIfCandidate = () => {
    dispatch({
      type: CHECK_IF_CANDIDATE
    });
  };
  const addToDirectory = () => {};

  return (
    <CandidateContext.Provider
      value={{
        checkIfCandidate,
        addToDirectory
      }}
    >
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateState;
