import {
  CHANGE_SCHEDULE_NOTIFICATION,
} from '../ActionTypes/ActionTypes';

const INITIAL_STATE = {
  scheduleList: [
    {
      name: 'Fajr',
      scheduled: false,
      time: null,
      notificationId:''
    },
    {
      name: 'Zuhr',
      scheduled: false,
      time: null,
      notificationId:''
    },
    {
      name: 'Asr',
      scheduled: false,
      time: null,
      notificationId:''
    },
    {
      name: 'Maghrib',
      scheduled: false,
      time: null,
      notificationId:''
    },
    {
      name: 'Isha',
      scheduled: false,
      time: null,
      notificationId:''
    },
  ],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
    
  switch (action.type) {
    case CHANGE_SCHEDULE_NOTIFICATION:
        const notifList =  state.scheduleList;
        const index = notifList.findIndex((item)=>item.name.toLowerCase() === action.payload.name.toLowerCase());
        notifList[index].time = action.payload.time;
        notifList[index].notificationId = action.payload.notificationId;
        notifList[index].scheduled = !notifList[index].scheduled;
      return {
        ...state,
        scheduleList: notifList,
      };

    default:
      return state;
  }
};

export default notificationReducer;
