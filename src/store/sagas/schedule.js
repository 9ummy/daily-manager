import { all, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

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

export function* watchFetchSchedules() {
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

export function* watchAddSchedule() {
  yield takeLatest(actionTypes.SCHEDULE_ADD_REQUEST, addSchedule);
}

function* updateSchedule(action) {
  try {
    const response = yield fetch('/api/schedules/' + action.payload._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    const updatedSchedule = yield response.json();

    yield put({
      type: actionTypes.SCHEDULE_UPDATE_SUCCESS,
      payload: updatedSchedule.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SCHEDULE_UPDATE_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchUpdateSchedule() {
  yield takeLatest(actionTypes.SCHEDULE_UPDATE_REQUEST, updateSchedule);
}

function* deleteSchedule(action) {
  try {
    const response = yield fetch(`/api/schedules/${action.payload}/delete`);
    const deletedSchedule = yield response.json();
    yield put({
      type: actionTypes.SCHEDULE_DELETE_SUCCESS,
      payload: deletedSchedule.data.id,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SCHEDULE_DELETE_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchDeleteSchedule(action) {
  yield takeLatest(actionTypes.SCHEDULE_DELETE_REQUEST, deleteSchedule);
}
