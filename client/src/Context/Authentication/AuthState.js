import React, { useReducer } from 'react';
// import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

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
    authorized: null,
    danger: null,
    alert: false,
    logout: false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const navLoginClicked = () => {
    dispatch({
      type: NAV_LOGIN_BTN
    });
  };

  // Load User

  // Register User

  // Login User

  // Logout

  //Clear Errors

  const authentication = (email, password) => {
    if ((email === '1') & (password === '1')) {
      dispatch({
        type: SUCCESSFUL_LOGIN
      });
    } else {
      dispatch({
        type: FAILED_LOGIN
      });
      unauthorizedAlert();
    }
  };

  const unauthorizedAlert = () => {
    setTimeout(() => {
      dispatch({
        type: RESET_DANGER
      });
    }, 3000);
    dispatch({
      type: SET_DANGER
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        // old
        nav_login_btn_clicked: state.nav_login_btn_clicked,
        authorized: state.authorized,
        danger: state.danger,
        alert: state.alert,
        logout: state.logout,
        navLoginClicked,
        authentication,
        unauthorizedAlert,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
