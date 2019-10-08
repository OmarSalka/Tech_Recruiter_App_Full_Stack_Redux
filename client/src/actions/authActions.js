import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';
import axios from 'axios';

// Load User
export const loadUser = () => async dispatch => {
  if (!localStorage.token) {
    dispatch({ type: AUTH_ERROR });
  } else {
    const config = {
      headers: {
        'x-auth-token': localStorage.token
      }
    };
    const res = await axios.get('/api/auth', config);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};

// Login User
export const login = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    });
  }
};

// Logout
export const logout = () => {
  return {
    type: LOGOUT
  };
};

//Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
