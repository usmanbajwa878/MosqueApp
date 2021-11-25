import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const scheduleNotif = (time, title, message) => {
  if (Platform.OS === 'ios') {
    // const getCorrectDate = () => {
    //     const date = new Date();
    //     date.setDate(date.getDate() + 1);
    //     date.setHours(23);
    //     date.setMinutes(54);
    //     return date;
    //   };


    PushNotificationIOS.addNotificationRequest({
    //   fireDate: new Date(Date.now() + 30 * 1000),
    id:'notificationWithSound',
      repeats: true,
      fireDate:new Date(Date.now() + (1000)),
      repeatsComponent: {
        hour: true,
        minute: true,
      },
      isCritical:true,
      title:title,
      body:message,
      
      
    });
  } else {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: 'Reminder-Channel',
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    })
  }
  //   PushNotification.scheduleLocalNotification({
  //     channelId: 'Reminder-Channel',
  //     title: title,
  //     message: message,
  //     allowWhileIdle: true,
  //     date: new Date(Date.now()+  1000),
  //     autoCancel: false,
  //     playSound: true,
  //   });
  // }
};
