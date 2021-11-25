import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator, FirstScreenStack} from './Stack';

const AppNavigator = props => {
    const isSelected = useSelector(state => state.mosque.userSelected);
  
  return (
    <NavigationContainer>
    {isSelected && <MainNavigator />}
    {!isSelected && <FirstScreenStack />}
  </NavigationContainer>
  );
};

export default AppNavigator;

