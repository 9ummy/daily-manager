import * as actionTypes from './actionTypes';

export const updateUser = () => {
  return {
    type: actionTypes.USER_UPDATE_REQUEST,
  };
};

export const fetchUser = () => {
  return {
    type: actionTypes.USER_FETCH_REQUEST,
  };
};

export const signInUser = (user) => {
  return {
    type: actionTypes.USER_SIGNIN_REQUEST,
    payload: user,
  };
};

export const loginUser = (user) => {
  return {
    type: actionTypes.USER_LOGIN_REQUEST,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.USER_LOGOUT_REQUEST,
  };
};
