import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

// import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  // OLD
  SUCCESSFUL_LOGIN,
  NAV_LOGIN_BTN,
  SET_DANGER,
  RESET_DANGER,
  FAILED_LOGIN
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    // old
    nav_login_btn_clicked: false,
    logout: false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const navLoginClicked = () => {
    dispatch({
      type: NAV_LOGIN_BTN
    });
  };

  // Load User
  const loadUser = async () => {
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }

    try {
      // let config2 = {
      //   headers: {
      //     'x-auth-token': localStorage.token
      //   }
      // };
      const res = await axios.get('/api/auth', {
        headers: {
          'x-auth-token': localStorage.token
        }
      });

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // Register User
  const register = async formData => {
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

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = () => console.log('login');

  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        // old
        nav_login_btn_clicked: state.nav_login_btn_clicked,
        authorized: state.authorized,
        danger: state.danger,
        alert: state.alert,
        logout: state.logout,
        navLoginClicked,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
