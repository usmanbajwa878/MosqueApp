/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import i18n from './src/Language/i18n';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


PushNotification.createChannel(
    {
      channelId: "Reminder", // (required)
      channelName: `Prayer Alert`, // (required)
      channelDescription: `Channel for Prayer Alert`, // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    if(Platform.OS === 'ios')   notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});


AppRegistry.registerComponent(appName, () => App);
