import React, { useReducer } from 'react';
import axios from 'axios';
import CandidateContext from './candidateContext';
import CandidateReducer from './CandidateReducer';

// import setAuthToken from '../../utils/setAuthToken';

import {
  IS_CANDIDATE,
  NOT_CANDIDATE,
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
  const initialState = {
    isCandidate: false
  };

  const [state, dispatch] = useReducer(CandidateReducer, initialState);

  const checkIfCandidate = async git_id => {
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.get('/api/candidates/check', git_id, config);
      console.log(res.data);
      dispatch({
        type: IS_CANDIDATE,
        payload: res.data
      });
    } catch (err) {
      console.log(localStorage.token);
      console.log(err.response.data.msg);
      dispatch({
        type: NOT_CANDIDATE,
        payload: err.response.data.msg
      });
    }
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
