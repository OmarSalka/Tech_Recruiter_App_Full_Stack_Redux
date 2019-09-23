import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './GithubReducer';

import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  SET_LOADING
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

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    clearButton: false,
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async text => {
    setLoading();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecrect}`
    );

    setTimeout(() => {
      dispatch({
        type: SEARCH_USERS,
        payload: response.data.items
      });
    }, 200);
  };

  const getUser = async login => {
    const response = await axios.get(
      `https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecrect}`
    );

    dispatch({
      type: GET_USER,
      payload: response.data
    });
  };

  const getRepos = async login => {
    const response = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecrect}`
    );

    dispatch({
      type: GET_REPOS,
      payload: response.data
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        clearButton: state.clearButton,
        searchUsers,
        getUser,
        getRepos,
        clearUsers,
        setLoading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
