import React, { useReducer } from 'react';
import axios from 'axios';
import CandidateContext from './candidateContext';
import CandidateReducer from './CandidateReducer';

import {
  SET_LOADING,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
  CLEAR_VERIFIER,
  GET_CANDIDATES,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
  NO_CANDIDATES_FOUND
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
    isCandidate: null,
    filterType: 'and',
    loading: false,
    candidates: [],
    emptyFilter: null,
    candidate: []
  };

  const [state, dispatch] = useReducer(CandidateReducer, initialState);

  const andFilterBtnToggled = () => {
    dispatch({
      type: AND
    });
  };
  const orFilterBtnToggled = () => {
    dispatch({
      type: OR
    });
  };

  const checkIfCandidate = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.get(`/api/candidate/${id}`, config);
      if (res.data.msg === 'This candidate exists in your directory') {
        dispatch({
          type: IS_CANDIDATE
        });
      } else if (res.data.msg === 'Does not exist') {
        dispatch({
          type: NOT_CANDIDATE
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: NOT_CANDIDATE
      });
    }
  };

  const clearVerifier = () => {
    dispatch({
      type: CLEAR_VERIFIER
    });
  };

  const addToDirectory = async candidateInfo => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.post('/api/candidates', candidateInfo, config);
      dispatch({
        type: ADD_CANDIDATE,
        payload: res.data
      });
      checkIfCandidate(candidateInfo.git_account_id);
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(candidateInfo);
    }
  };

  // ======================================

  const loadFilteredCandidates = async (filterInput, spinner = true) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };

    if (spinner) setLoading();

    try {
      let wholeList = [];
      let dbData;
      if (filterInput)
        dbData = await axios.post('/api/filter', filterInput, config);
      if (!filterInput) dbData = await axios.post('/api/filter', config);
      // eslint-disable-next-line
      for (const i of dbData.data) {
        const res = await axios.get(
          `https://api.github.com/user/${i.git_account_id}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
        );
        res.data.position = i.position;
        res.data.notes = i.notes;
        wholeList = [...wholeList, res.data];
      }
      if (wholeList.length === 0) {
        dispatch({
          type: NO_CANDIDATES_FOUND
        });
      } else {
        dispatch({
          type: GET_CANDIDATES,
          payload: wholeList
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadCandidates = async (filterInput, spinner = true) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };

    if (spinner) setLoading();

    try {
      let wholeList = [];
      let dbData;
      if (filterInput)
        dbData = await axios.get('/api/candidates', filterInput, config);
      if (!filterInput) dbData = await axios.get('/api/candidates', config);
      // eslint-disable-next-line
      for (const i of dbData.data) {
        const res = await axios.get(
          `https://api.github.com/user/${i.git_account_id}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
        );
        res.data.position = i.position;
        res.data.notes = i.notes;
        wholeList = [...wholeList, res.data];
      }
      dispatch({
        type: GET_CANDIDATES,
        payload: wholeList
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateCandidate = async (updates, git_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.put(`/api/candidates/${git_id}`, updates, config);
      dispatch({
        type: UPDATE_CANDIDATE,
        payload: res.data
      });
      loadCandidates(null, false);
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(err);
    }
  };

  const deleteCandidate = async (filterData, git_id) => {
    const config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };
    try {
      await axios.delete(`/api/candidates/${git_id}`, config);
      dispatch({
        type: DELETE_CANDIDATE
      });
      loadFilteredCandidates(filterData, false);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <CandidateContext.Provider
      value={{
        filterType: state.filterType,
        loading: state.loading,
        isCandidate: state.isCandidate,
        candidates: state.candidates,
        emptyFilter: state.emptyFilter,
        andFilterBtnToggled,
        orFilterBtnToggled,
        checkIfCandidate,
        clearVerifier,
        addToDirectory,
        loadCandidates,
        updateCandidate,
        deleteCandidate,
        setLoading,
        loadFilteredCandidates
      }}
    >
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateState;
