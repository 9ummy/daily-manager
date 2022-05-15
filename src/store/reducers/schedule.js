import { HYDRATE } from 'next-redux-wrapper';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  scheduleList: [],
  selectedSchedule: null,
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.SCHEDULE_FETCH_SUCCESS:
      return {
        ...state,
        scheduleList: action.payload,
      };
    case actionTypes.SCHEDULE_ADD_SUCCESS:
      return {
        ...state,
        scheduleList: [action.payload, ...state.scheduleList],
      };
    case actionTypes.SCHEDULE_UPDATE_SUCCESS:
      const updatedScheduleList = state.scheduleList.map((schedule) => {
        if (schedule._id === action.payload._id) {
          return {
            ...schedule,
            title: action.payload.title,
            description: action.payload.description,
            time: action.payload.time,
          };
        }
        return schedule;
      });
      return {
        ...state,
        scheduleList: updatedScheduleList,
      };
    case actionTypes.SCHEDULE_DELETE_SUCCESS:
      const newScheduleList = state.scheduleList.filter(
        (schedule) => schedule._id !== action.payload,
      );
      return {
        ...state,
        scheduleList: newScheduleList,
      };
    case actionTypes.SCHEDULE_SELECTED:
      const selectedSchedule = state.scheduleList.find(
        (schedule) => schedule._id === action.payload,
      );
      return {
        ...state,
        selectedSchedule,
      };
    default:
      return state;
  }
};

export default scheduleReducer;
