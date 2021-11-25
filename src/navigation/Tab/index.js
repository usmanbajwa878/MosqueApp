import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants/AppConstants';
import HomeScreen from '../../Screens/HomeScreen';
import FavouriteScreen from '../../Screens/FavouriteScreen';
// import QiblaScreen from '../../Screens/QiblaScreen';
import QiblaScreen from '../../Screens/QiblaScreencopy';
import Calander from '../../Screens/Calendar';
import SearchScreen from '../../Screens/SearchScreen';
import SettingsScreen from '../../Screens/SettingsScreen';
import Svg, {Path} from 'react-native-svg';

import {ROUTES} from './Routes';
import Header from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  let isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.WHITE}} />
          <Svg width={75} height={61} viewBox="0 0 75 62">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.WHITE}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.WHITE}} />
        </View>
        <TouchableOpacity
        style={{
          top:-22,
          justifyContent:'center',
          alignItems:'center',
          height: 50,
          width:50,
          borderRadius:25,
          backgroundColor: COLORS.LIGHT_GREEN,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, }}>
      <TouchableOpacity
        style={{
          height: 60,
          backgroundColor: COLORS.WHITE,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
      </View>
    );
  }
};

const Tab = createBottomTabNavigator();

const TabScreenNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="HomeScreen"
      screenOptions={{
        // 
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:{
          borderTopWidth:0,
          backgroundColor:COLORS.WHITE,
          elevation:0
        }
      }}
     
    >
      <Tab.Screen
        name="FavouriteScreen"
        options={{
          
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/bookmark.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={FavouriteScreen}
      />
      <Tab.Screen
     
        name="QiblaScreen"
        options={{
          
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/qibla.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={QiblaScreen}
      />
      <Tab.Screen
        name="HomeScreen"

        options={{
          
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/sallat.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="SearchScreen"
        options={{
          
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/search.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Calander"
        options={{
          
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/calander.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={Calander}
      />
      <Tab.Screen
        name="SettingsScreen"
        options={{
          tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarIcon:({focused})=>(
            <Image
            resizeMode="contain"
            source={require('../../Assets/Images/Icons/settingIcon.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: focused
                ? COLORS.APP_COLOR
                : COLORS.SEARCH_BAR_BLACK,
            }}
          />
          )
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const CustomNavigator = props => {
  return (
    <View style={{flex: 1}}>
      <View style={{height: '30%'}}>
        <Header />
      </View>

      <View
        style={{
          backgroundColor: COLORS.SILVER,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          marginTop: -20,
          overflow: 'hidden',
        }}>
        <TabScreenNavigator props={props} />
      </View>
    </View>
  );
};

CustomNavigator.router = Tab.router;
export default CustomNavigator;

// class CustomNavigator extends React.Component {
//   static router = MyTab.router;
//   render() {
//     const { navigation } = this.props;

//     return (
//       {/* This SafeAreaView is from ReactNavigation.
//           forceInset-bottom-never is needed because  the
//           TabNavigator is already Safe-area-ing the bottom.
//           You don't want to do it again.*/}
//       <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
//         {/* SearchHeader is zIndex: 1(or elevation: 1) for the absolute
//             positioned stuff that appears and cover the
//             screen after focusing on Input. */}
//         <SearchHeader/>
//         <MyTab navigation={navigation} />
//       </SafeAreaView>
//     );
//   }
// }
