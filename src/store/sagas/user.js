import * as actionTypes from '../actions/actionTypes';
import { all, put, takeLatest } from 'redux-saga/effects';

function* joinUser(action) {
  try {
    const response = yield fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const newUser = yield response.json();

    if (response.status == 201) {
      yield put({
        type: actionTypes.USER_SIGNIN_SUCCESS,
        payload: newUser.data,
      });

      yield put((window.location.href = './login'));
    } else {
      alert('가입에 실패했습니다!');
    }
  } catch (error) {
    yield put({
      type: actionTypes.USER_SIGNIN_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchJoinUser() {
  yield takeLatest(actionTypes.USER_SIGNIN_REQUEST, joinUser);
}

function* loginUser(action) {
  try {
    const response = yield fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    if (response.status == 200) {
      const newUser = yield response.json();

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: action.payload.id,
          uuid: newUser.data.uuid,
          token: newUser.data.token,
          tokenExpire: newUser.data.tokenExpire,
        }),
      );

      yield put({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: newUser.data,
      });
    } else {
      alert('가입한 ID 가 없거나 PW가 맞지 않습니다.');
    }
  } catch (error) {
    yield put({
      type: actionTypes.USER_LOGIN_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchLogin() {
  yield takeLatest(actionTypes.USER_LOGIN_REQUEST, loginUser);
}

function* logoutUser(action) {
  localStorage.removeItem('user');
  yield put({ type: actionTypes.USER_LOGOUT_SUCCESS });
}

export function* watchLogout() {
  yield takeLatest(actionTypes.USER_LOGOUT_REQUEST, logoutUser);
}

export function* fetchUser(action) {}
