import axios from 'axios';
import {
  SET_LOADING_CANDIDATES,
  AND,
  OR,
  IS_CANDIDATE,
  NOT_CANDIDATE,
  CLEAR_VERIFIER,
  DISPLAY_CLEAR_BTN,
  MASK_CLEAR_BTN,
  GET_CANDIDATES,
  ADD_CANDIDATE,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
  NO_CANDIDATES_FOUND
} from './types';

let githubClientId;
let githubClientSecrect;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecrect = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecrect = process.env.GITHUB_CLIENT_SECRET;
}

// And filter button clicked
export const andFilterBtnToggled = () => {
  return {
    type: AND
  };
};

// Or filter button clicked
export const orFilterBtnToggled = () => {
  return {
    type: OR
  };
};

// Check if candidate exists in user's directory
export const checkIfCandidate = id => async dispatch => {
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
    dispatch({
      type: NOT_CANDIDATE
    });
  }
};

// clear state with regards to verifying whether a candidate
export const clearVerifier = () => {
  return {
    type: CLEAR_VERIFIER
  };
};

// add candidate to directory
export const addToDirectory = candidateInfo => async dispatch => {
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
    dispatch(checkIfCandidate(candidateInfo.git_account_id));
  } catch (err) {
    console.log(err.response.data.msg ? err.response.data.msg : err);
  }
};

// load candidates in directory when and/or filter is applied
export const loadFilteredCandidates = (
  filterInput,
  spinner = true
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token
    }
  };
  if (spinner) dispatch(setLoading());
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

// load candidates in directory when no filter is applied
export const loadCandidates = (
  filterInput,
  spinner = true
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token
    }
  };
  if (spinner) dispatch(setLoading());
  if (localStorage.token) {
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
      console.log(err.response.data.msg ? err.response.data.msg : err);
    }
  }
};

// Update notes about candidate in directory
export const updateCandidate = (updates, git_id) => async dispatch => {
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
    dispatch(loadCandidates(null, false));
  } catch (err) {
    console.log(err.response.data.msg ? err.response.data.msg : err);
  }
};

// delete candidate from directory
export const deleteCandidate = (filterData, git_id) => async dispatch => {
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
    dispatch(loadFilteredCandidates(filterData, false));
  } catch (err) {
    console.log(err.response.data.msg ? err.response.data.msg : err);
  }
};

// Set loading
export const setLoading = () => {
  return {
    type: SET_LOADING_CANDIDATES
  };
};

// Display clear button
export const displayClearButton = () => {
  return {
    type: DISPLAY_CLEAR_BTN
  };
};
// Hide clear button
export const maskClearButton = () => {
  return {
    type: MASK_CLEAR_BTN
  };
};
