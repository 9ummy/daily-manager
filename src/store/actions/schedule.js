import * as actionTypes from './actionTypes';

export const fetchSchedules = () => {
  return {
    type: actionTypes.SCHEDULE_FETCH_REQUEST,
  };
};

export const addSchedule = (schedule) => {
  return {
    type: actionTypes.SCHEDULE_ADD_REQUEST,
    payload: schedule,
  };
};

export const updateSchedule = (schedule) => {
  return {
    type: actionTypes.SCHEDULE_UPDATE_REQUEST,
    payload: schedule,
  };
};

export const deleteSchedule = (id) => {
  return {
    type: actionTypes.SCHEDULE_DELETE_REQUEST,
    payload: id,
  };
};

export const setSelectedSchedule = (id) => {
  return {
    type: actionTypes.SCHEDULE_SELECTED,
    payload: id,
  };
};
