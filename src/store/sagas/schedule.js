import { all, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

function* fetchSchedules() {
  try {
    const response = yield fetch('/api/schedules');
    const scheduleList = yield response.json();
    yield put({
      type: actionTypes.SCHEDULE_FETCH_SUCCESS,
      payload: scheduleList.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SCHEDULE_FETCH_FAILURE,
      payload: error.message,
    });
  }
}

function* watchFetchSchedules() {
  yield takeLatest(actionTypes.SCHEDULE_FETCH_REQUEST, fetchSchedules);
}

function* addSchedule(action) {
  try {
    const response = yield fetch('/api/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    const newSchedule = yield response.json();
    yield put({
      type: actionTypes.SCHEDULE_ADD_SUCCESS,
      payload: newSchedule.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SCHEDULE_ADD_FAILURE,
      payload: error.message,
    });
  }
}

function* watchAddSchedule() {
  yield takeLatest(actionTypes.SCHEDULE_ADD_REQUEST, addSchedule);
}
