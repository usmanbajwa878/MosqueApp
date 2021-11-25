import Geolocation from '@react-native-community/geolocation';

import {Alert} from 'react-native';
import geolib from 'geolib';

export const GetCurrentLocation = () => {
  let currentLocation = {};
  Geolocation.getCurrentPosition(
    position => {
      const initialPosition = JSON.stringify(position);
      console.log('position', position);
      currentLocation = initialPosition;
    },
    error => Alert.alert('Error', JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
  return currentLocation;
};
