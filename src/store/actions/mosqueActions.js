import {
  GET_MOSQUES_BY_LOCATION_COMPLETED,
  GET_MOSQUES_BY_LOCATION_PENDING,
  GET_MOSQUES_BY_LOCATION_REJECTED,
  POST_FAVOURITE_MOSQUE,
  POST_SELECTED_MOSQUE,
  REMOVE_MOSQUE,
  SELECT_MOSQUE_START,
  USER_PUSHED_TO_HOME,
} from '../ActionTypes/ActionTypes';

import Network from '../../Service';

export const actionGetMosques = data => {
  return async dispatch => {
    try {
      dispatch({
        type: GET_MOSQUES_BY_LOCATION_PENDING,
        payload: true,
      });
      console.log('DISPATCHED FORST');
      let response = await Network.createNetworkRequest(
        'POST',
        'GetMosqueByKey',
        data,
      );
      console.log('response in Mosque Action', response);
      if (response.success) {
        dispatch({
          type: GET_MOSQUES_BY_LOCATION_COMPLETED,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GET_MOSQUES_BY_LOCATION_REJECTED,
          payload: true,
        });
      }
    } catch (error) {
      console.log('ERROR', error);
      dispatch({
        type: GET_MOSQUES_BY_LOCATION_REJECTED,
        payload: true,
      });
    }
  };
};

export const actionSelectMosque = data => {
  return async dispatch => {
    dispatch({
      type: POST_SELECTED_MOSQUE,
      payload: data,
    });
  };
};

export const actionAddMosque = data => {
  return async dispatch => {
    dispatch({
      type: SELECT_MOSQUE_START,
      payload: data,
    });
  };
};

export const actionUserMoveToHome = data => {
  return async dispatch => {
    dispatch({
      type: USER_PUSHED_TO_HOME,
      payload: data,
    });
  };
};

export const actionAddtoFavourite = data => {
  return async dispatch => {
    dispatch({
      type: POST_FAVOURITE_MOSQUE,
      payload: data,
    });
  };
};
export const removefromFavourites = data => {
  return async dispatch => {
    dispatch({
      type: REMOVE_MOSQUE,
      payload: data,
    });
  };
};
