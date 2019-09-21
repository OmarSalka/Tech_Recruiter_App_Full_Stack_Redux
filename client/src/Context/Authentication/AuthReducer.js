import {
  NAV_LOGIN_BTN,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGOUT,
  // old
  RESET_DANGER,
  SET_DANGER,
  SUCCESSFUL_LOGIN,
  FAILED_LOGIN
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case NAV_LOGIN_BTN:
      return {
        ...state,
        nav_login_btn_clicked: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SUCCESSFUL_LOGIN:
      return {
        ...state,
        authorized: true,
        danger: { borderColor: 'green' }
      };
    case FAILED_LOGIN:
      return {
        ...state,
        authorized: false
      };

    case SET_DANGER:
      return {
        ...state,
        danger: { borderColor: 'red' },
        alert: true
      };
    case RESET_DANGER:
      return {
        ...state,
        alert: false
      };
    case LOGOUT:
      return {
        authorized: null,
        nav_login_btn_clicked: false,
        danger: null
      };
    default:
      return {
        ...state
      };
  }
};
