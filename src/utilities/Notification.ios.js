import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const scheduleNotif = (time, title, message) => {
    console.log("INSIDE SCHEDULE")
const scheduleTime = new Date();

    scheduleTime.setHours(time.hours);
    scheduleTime.setMinutes(time.minutes);
    const id = JSON.stringify(parseInt(new Date().getTime()));

    PushNotificationIOS.scheduleLocalNotification({
      id: id,
      userInfo: { id: id },
      channelId:'Reminder',
      alertTitle:title,
      alertBody: message, // (required)
      fireDate: scheduleTime.toISOString(),
      repeatInterval:"day",
      criticalSoundVolume:1,
      sound:'default',
      isSilent:false,
      
    });
    return id;
};


export const clearNotification = (id) =>{
    PushNotificationIOS.removePendingNotificationRequests([id])
}