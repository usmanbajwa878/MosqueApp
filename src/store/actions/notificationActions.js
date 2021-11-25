import {
    CHANGE_SCHEDULE_NOTIFICATION,
  } from '../ActionTypes/ActionTypes';

export const actionChangeScheduleNotification = data => {
    return async dispatch => {
      dispatch({
        type: CHANGE_SCHEDULE_NOTIFICATION,
        payload: data,
      });
    };
  };
