import { all } from 'redux-saga/effects';
import {
  watchFetchSchedules,
  watchAddSchedule,
  watchDeleteSchedule,
  watchUpdateSchedule,
} from './schedule';
import {
  watchJoinUser,
  watchLogin,
  watchLogout,
  watchUpdateUser
} from './user';

export default function* rootSaga() {
  yield all([
    watchFetchSchedules(),
    watchAddSchedule(),
    watchDeleteSchedule(),
    watchUpdateSchedule(),
    watchJoinUser(),
    watchLogin(),
    watchLogout(),
    watchUpdateUser()
  ]);
}
