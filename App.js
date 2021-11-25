/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect, useMemo} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import STORE from './src/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import PushNotification,{Importance} from 'react-native-push-notification';
import SplashScreen from "react-native-splash-screen";


const App = props => {


  useEffect(()=>{
      createChannel();
      SplashScreen.hide();
  },[]);




 const createChannel = () =>{
  PushNotification.createChannel(
    {
      channelId: "Reminder-Channel", // (required)
      channelName: `Reminder Channel`, // (required)
      channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
 }



  return (
    <Provider store={STORE.store}>
      <PersistGate loading={null} persistor={STORE.persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
