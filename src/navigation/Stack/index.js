import React from 'react';
import {Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../constants/AppConstants';
import PrayerNotification from '../../Screens/PrayerNotification';
import LanguagePicker from '../../Screens/LanguagePickerScreen';
import FirstScreen from '../../Screens/FirstScreen';
import TabScreenNavigator from '../Tab/index';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();
const FirstStack = createStackNavigator();


export const FirstScreenStack = props =>{
  return  (
    <FirstStack.Navigator>
      <FirstStack.Screen 
      name="FirstScreen"
      component={FirstScreen}
      options={{
        headerMode:'none',
        headerShown:false
      }}
      />
    </FirstStack.Navigator>
  )
}


export const MainNavigator = (props) => {


  return (
    <Stack.Navigator initialRouteName="HomeStack">
         <Stack.Screen
        name="PrayerNotifications"
        component={PrayerNotification}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
    <Stack.Screen
        name="LanguagePicker"
        component={LanguagePicker}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HomeStack"
        component={TabScreenNavigator}
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};




