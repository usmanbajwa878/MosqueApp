import {
    CHANGE_ACTIVE_LANGUAGE,
    CHANGE_TIME_FORMAT
  } from '../ActionTypes/ActionTypes';
  
  const INITIAL_STATE = {
    timeFormat: 12,   //12 or 24,
    activeLangauge:'English'
  };
  
  const TimeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CHANGE_TIME_FORMAT:
        return {
          ...state,
          timeFormat: action.payload,
        };
    case CHANGE_ACTIVE_LANGUAGE:
        return {
            ...state,
            activeLangauge:action.payload
        }
      
      default:
        return state;
        break;
    }
  };
  
  export default TimeReducer;
  