import * as actionTypes from '../actions/actionTypes';
import { all, put, takeLatest } from 'redux-saga/effects';

function* signInUser(action) {
  try {
    const response = yield fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const newUser = yield response.json();

    if (response.status == 200) {
      yield put({
        type: actionTypes.USER_SIGNIN_SUCCESS,
        payload: newUser.data,
      });

      //yield put(window.location.href = './login');
    } else {
      alert('가입에 실패했습니다.');
    }

  } catch (error) {
    yield put({
      type: actionTypes.USER_SIGNIN_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchSignInUser() {
  yield takeLatest(actionTypes.USER_SIGNIN_REQUEST, signInUser);
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
      localStorage.setItem('user', JSON.stringify(action.payload));
      const newUser = yield response.json();
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
  yield put({ type: actionTypes.USER_LOGOUT_SUCCESS });
}

export function* watchLogout() {
  yield takeLatest(actionTypes.USER_LOGOUT_REQUEST, logoutUser);
}

export function* fetchUser(action) {

}

export default function* rootSaga() {
  yield all([
    watchSignInUser(),
    watchLogin(),
    watchLogout(),
  ]);
}

