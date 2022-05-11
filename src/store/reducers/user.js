import { HYDRATE } from 'next-redux-wrapper';
import * as actionTypes from '../actions/actionTypes';

// TODO uuid 및 API 결과 내용을 token 에 주입
const initialState = {
  loginUser: '',
  isLoggined: false,
  token: '',
  uuid: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
//    case actionTypes.USER_FETCH_SUCCESS :
    case actionTypes.USER_UPDATE_PW_SUCCESS :
      return {
        ...state
      }

    case actionTypes.USER_LOGIN_SUCCESS :
      return {
        loginUser: action.payload.id,
        isLoggined: true,
        token: '',
        uuid: '',
      };
    case actionTypes.USER_LOGOUT_SUCCESS :
      return {
        loginUser: '',
        isLoggined: false,
        token: '',
        uuid: '',
      };
    case actionTypes.USER_SIGNIN_SUCCESS : {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default userReducer;