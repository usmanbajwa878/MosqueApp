import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from 'react-native';
import {COLORS} from '../constants/AppConstants';
import deviceHeading from 'react-native-device-heading';
import Geolocation from '@react-native-community/geolocation';
import {useTranslation} from 'react-i18next';

const QiblaScreen = props => {
  const [compassHeading, setCompassHeading] = useState(0);
  const [qibld,setQiblaD] = useState(0);

  const {t} = useTranslation();


  useEffect(()=>{
    getLocation();
      deviceHeading.start(1,degree=>{
        setCompassHeading(degree)
      });
     return ()=>deviceHeading.stop() 
  },[])

  const calculate = (latitude,longitude) =>{
    console.log("latitude longitude",latitude,longitude)
      const PI = Math.PI;
      let phik = (21.4225 * PI) / 180.0; //qibla lat
    let lamdak = (39.8264 * PI) / 180.0;//qibla lng
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(lamdak - lambda),
        Math.cos(phi) * Math.tan(phik) -
          Math.sin(phi) * Math.cos(lamdak - lambda),
      );
   
      qiblad = Math.round(qiblad)
      console.log("qibled",qiblad);
    setQiblaD(qiblad);
    console.log("qibled by 360",360 + qiblad );
  }

  const getLocation =() =>{
    Geolocation.getCurrentPosition(position =>{
      const {latitude,longitude} = position.coords;
      calculate(latitude,longitude)
    },
    error=>{
      console.log("error",error)
    },
    {enableHighAccuracy:true,timeout:15000,maximumAge:10000}
    )
  };


  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
            color: COLORS.APP_COLOR,
          }}>
          {t('QiblaDirection')}
        </Text>
        <Animated.Image
            resizeMode="contain"
            source={require('../Assets/Images/Intro/simpleCompass.png')}
            style={{
              width: deviceWidth - 10,
              height: deviceHeight / 2 - 50,
              left: deviceWidth / 2 - (deviceWidth - 10) / 2,
              top: deviceHeight / 8,
              transform: [{rotate: `${compassHeading}deg`}],
              zIndex:0
            }}
          />
          <Animated.Image
              style={{
                width: 200,
                height: 200,
                transform: [{rotate: `${360 + compassHeading}deg`}],
                width: deviceWidth - 10,
              height: deviceHeight / 2,
              left: deviceWidth / 2 - (deviceWidth - 20) / 2,
              top: deviceHeight / 8,
              zIndex:1,
              position:'absolute'
              }}
            resizeMode="contain"
            source={require('../Assets/Images/Intro/needle.png')}
          />
      </View>
    </View>
  );
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  image: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -60,
  },
  arrowContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    left: deviceWidth / 2 - deviceWidth / 7 / 2,
    top: deviceHeight / 2 - deviceWidth / 7 / 2,
    opacity: 0.9,
  },
  text: {
    color: '#263544',
    fontSize: 80,
    transform: [
      {translateY: -(deviceHeight / 2 - (deviceHeight / 2 - 10) / 2) - 50},
    ],
  },
});

export default QiblaScreen;
