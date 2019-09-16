import {
  SUCCESSFUL_LOGIN,
  NAV_LOGIN_BTN,
  SET_DANGER,
  RESET_DANGER,
  FAILED_LOGIN,
  LOGOUT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case NAV_LOGIN_BTN:
      return {
        ...state,
        nav_login_btn_clicked: true
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
