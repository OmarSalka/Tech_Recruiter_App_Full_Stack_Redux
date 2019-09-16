import React, { useReducer } from 'react';
// import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

import {
  SUCCESSFUL_LOGIN,
  NAV_LOGIN_BTN,
  SET_DANGER,
  RESET_DANGER,
  FAILED_LOGIN,
  LOGOUT
} from '../types';

const AuthState = props => {
  const initialState = {
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
