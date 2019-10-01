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
  GET_SINGLE_CANDIDATE,
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
    isCandidate: false,
    and: true,
    or: false,
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

  const checkIfCandidate = async git_id => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };
    try {
      const res = await axios.get('/api/candidate', git_id, config);
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

  const loadCandidates = async (spinner = true) => {
    const config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };

    {
      spinner && setLoading();
    }
    try {
      let wholeList = [];
      const dbData = await axios.get('/api/candidates', config);
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
      // await dbData.data.map(async candidate => {
      //   const res2 = await axios.get(
      //     `https://api.github.com/user/${candidate.git_account_id}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
      //   );
      //   res2.data.position = candidate.position;
      //   res2.data.notes = candidate.notes;
      //   finalList = [...finalList, res2.data];
      // });
      // setTimeout(() => {
      dispatch({
        type: GET_CANDIDATES,
        payload: wholeList
        // payload: dbData.data
      });
      // }, 1000);
      // setTimeout(() => {
      //   console.log(finalList);
      //   dispatch({
      //     type: GET_CANDIDATES,
      //     payload: finalList
      //   });
      // }, 1000);
    } catch (err) {
      console.log(err);
      // console.log(err.response.data.msg);
      // dispatch({
      //   type: NO_CANDIDATES_FOUND,
      //   payload: err.response.data.msg
      // });
    }
  };

  const loadSingleCandidate = async git_account_id => {
    // console.log('git_account', git_account_id);
    // try {
    //   const res = await axios.get(
    //     `https://api.github.com/user/${git_account_id}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
    //   );
    //   return res.data;
    //   dispatch({
    //     type: GET_SINGLE_CANDIDATE,
    //     payload: res.data
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // ======================================

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
      loadCandidates(false);
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
      const res = await axios.put(`/api/candidates/${git_id}`, config);
      console.log('Deleted Successfully');
      console.log('delete', res);
      dispatch({
        type: DELETE_CANDIDATE
        // payload: res.data
      });
    } catch (err) {
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
        and: state.and,
        or: state.or,
        loading: state.loading,
        candidates: state.candidates,
        candidate: state.candidate,
        andFilterBtnToggled,
        orFilterBtnToggled,
        checkIfCandidate,
        addToDirectory,
        loadCandidates,
        loadSingleCandidate,
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
