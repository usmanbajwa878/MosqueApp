import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const scheduleNotif = (time, title, message) => {
const scheduleTime = new Date();
    scheduleTime.setHours(time.hours);
    scheduleTime.setMinutes(time.minutes);
    const id = JSON.stringify(parseInt(new Date().getTime()));
    PushNotification.localNotificationSchedule({
        id: id,
        userInfo: { id: id },
      //... You can use all the options from localNotifications
      channelId:'Reminder',
      title:title,
      message: message, // (required)
      date: scheduleTime, // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      importance:'high',
      repeatType:"day",
      vibration:300,
      soundName:'default',
      ignoreInForeground:false,
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
    return id;
};


export const clearNotification = (id) =>{
    PushNotification.cancelAllLocalNotifications({id:id})
}