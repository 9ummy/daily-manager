import { combineReducers } from 'redux';
import scheduleReducer from './schedule';
import userReducer from './schedule';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  user: userReducer,
});

export default rootReducer;
