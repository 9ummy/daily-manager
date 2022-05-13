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
          model : JSON.parse(newUser.data._doc.model)
        }),
      );

      yield put({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: newUser.data,
      });

      yield put((window.location.href = '/schedules'));
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

function* updateUserPassword(action){
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const pw = action.payload.pw;
  const newPw = action.payload.newPw;

  try {
    const response = yield fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        id : userId,
        pw : pw
      }),
    });

    if(response.status === 200){
      const response2 = yield fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          pw : newPw
        }),
      })
      if(response2.status === 200){
        alert("수정 완료");
        yield put((window.location.href = './login'));
      } else {
        alert("수정 하는데 오류가 발생했습니다.");
      }

    } else {
      alert("비밀번호가 잘못되었습니다.")
    }

  } catch (error) {
    yield put({
      type: actionTypes.USER_UPDATE_FAILURE,
      payload: error.message,
    });
  }

}

export function* watchUpdateUserPassword(){
  yield takeLatest(actionTypes.USER_UPDATE_PW_REQUEST, updateUserPassword)
}

function* updateUserModel(action){

}

export function* watchUpdateUserModel(){
  yield takeLatest(actionTypes.USER_UPDATE_MODEL_REQUEST, updateUserModel)
}