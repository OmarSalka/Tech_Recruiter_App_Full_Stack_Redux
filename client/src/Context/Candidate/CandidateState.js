import React, { useReducer } from 'react';
import axios from 'axios';
import CandidateContext from './candidateContext';
import CandidateReducer from './CandidateReducer';

// import setAuthToken from '../../utils/setAuthToken';

import {
  SET_LOADING,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
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
    // token: localStorage.getItem('token'),
    isCandidate: null,
    filterType: 'and',
    loading: false,
    candidates: [],
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
    console.log(id);
    try {
      const res = await axios.get(`/api/candidate/${id}`, config);
      // const res = await axios({
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-auth-token': localStorage.token
      //   },
      //   url: '/api/candidate',
      //   method: 'GET',
      //   data: git_account_id
      // });
      console.log(id);
      if (res.data.msg === 'This candidate exists in your directory') {
        console.log(res.data.msg);
        dispatch({
          type: IS_CANDIDATE
        });
      } else if (res.data.msg === 'Does not exist') {
        console.log(res.data.msg);
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

  const addToDirectory = async candidateInfo => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.post('/api/candidates', candidateInfo, config);
      console.log('Added successfully');
      dispatch({
        type: ADD_CANDIDATE,
        payload: res.data
      });
    } catch (err) {
      console.log(err.response.data.msg);
      console.log(candidateInfo);
    }
  };

  // ======================================

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

      console.log('dbData', dbData.data);
      for (const i of dbData.data) {
        const res = await axios.get(
          `https://api.github.com/user/${i.git_account_id}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
        );
        res.data.position = i.position;
        res.data.notes = i.notes;
        wholeList = [...wholeList, res.data];
      }
      console.log('wholeList', wholeList);
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
      console.log('Updated Successfully');
      dispatch({
        type: UPDATE_CANDIDATE,
        payload: res.data
      });
      loadCandidates(null, false);
    } catch (err) {
      // console.log(err.response.data.msg);
      console.log(err);
      console.log(updates);
      console.log(git_id);
      // dispatch({
      //   type: ,
      //   payload: err.response.data.msg
      // });
    }
  };

  const deleteCandidate = async git_id => {
    const config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.delete(`/api/candidates/${git_id}`, config);
      console.log('Deleted Successfully');
      console.log('delete', res);
      dispatch({
        type: DELETE_CANDIDATE
        // payload: res.data
      });
      loadCandidates(false);
    } catch (err) {
      console.log('too bad');
      console.log(err.response.data.msg);
      // dispatch({
      //   type: ,
      //   payload: err.response.data.msg
      // });
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
        andFilterBtnToggled,
        orFilterBtnToggled,
        checkIfCandidate,
        addToDirectory,
        loadCandidates,
        updateCandidate,
        deleteCandidate,
        setLoading
      }}
    >
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateState;
