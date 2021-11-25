import {
    CHANGE_TIME_FORMAT,
    CHANGE_ACTIVE_LANGUAGE
  } from '../ActionTypes/ActionTypes';

export const actionChangeFormat = data => {
    return async dispatch => {
      dispatch({
        type: CHANGE_TIME_FORMAT,
        payload: data,
      });
    };
  };


export const actionChangeLanguage = data => {
    return async dispatch => {
      dispatch({
        type: CHANGE_ACTIVE_LANGUAGE,
        payload: data,
      });
    };
  };