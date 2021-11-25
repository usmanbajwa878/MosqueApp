import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS} from '../../constants/AppConstants';

import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getCurrentPrayer} from '../../utilities/methods';
import moment from 'moment';

const Header = props => {
  const {t} = useTranslation();

  const [dt, setDt] = useState(new Date().toLocaleTimeString());
  const selectedItem = useSelector(item => item.mosque.selectedMosque);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [nextPrayer,setNextPrayer] = useState(null);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(0);

  const interval = React.useRef();

  useEffect(() => {
    // let data = getCurrentPrayer(selectedItem.timings);
    // setHours(data.diff-1);
    // setMinutes(59);
    // setSeconds(60);
    let data = getCurrentPrayer(selectedItem.timings,nextPrayer);
    setNextPrayer(data)
    setHours(data.diff.hourDiff-1);
    setMinutes(data.diff.minuteDiff-1);
    setSeconds(60);

  }, []);

  // const [seconds, setSeconds] = React.useState(10);
  // const interval = React.useRef();

  // React.useEffect(() => {
  //   interval.current = setInterval(
  //     () => setSeconds((prevTimer) => prevTimer - 1),
  //     1000
  //   );
  // }, []);

  // if (seconds === 0) {
  //   clearInterval(interval.current);
  // }


  useEffect(() => {
    interval.current = setInterval(
      () => setSeconds(prevTimer => prevTimer - 1),
      1000,
    );
  }, []);

  if (seconds === 0) {
    // clearInterval(interval.current)
    if (minutes === 0) {
      if (hours === 0) {
        let data = getCurrentPrayer(selectedItem.timings,nextPrayer);
        console.log("currentPrayer",data)
        setNextPrayer(data)
        setHours(data.diff.hourDiff-1);
        setMinutes(data.diff.minuteDiff-1);
        setSeconds(60);
    
      //  clearInterval(interval.current);
      } else {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    } else {
      setMinutes(minutes -1);
      setSeconds(59);
    }
  }

  // useEffect(() => {
  //   interval.current = setInterval(
  //     () => setSeconds(prevTimer => prevTimer - 1),
  //     1000,
  //   );
  // }, []);

  // if (seconds === 0) {
  //   // clearInterval(interval.current)
  //   if (minutes === 0) {
  //     if (hours === 0) {
  //       let data = getCurrentPrayer(selectedItem.timings,nextPrayer);
  //       console.log("currentPrayer",data)
  //       setNextPrayer(data)
  //       setHours(data.diff.hourDiff-1);
  //       setMinutes(data.diff.minuteDiff-1);
  //       setSeconds(60);
  //     //  clearInterval(interval.current);
  //     } else {
  //       setHours(hours - 1);
  //       setMinutes(59);
  //       setSeconds(59);
  //     }
  //   } else {
  //     setMinutes(minutes -1);
  //     setSeconds(59);
  //   }
  // }

  // useEffect(()=>{
  //   let myTimeout = setInterval(() => {
  //     if(seconds <= 0){
  //       if (minutes <= 0) {
  //         if (hours <= 0) {
  //           ()=>clearInterval(myTimeout);
  //         } else {
  //           setHours(hours-1);
  //           setMinutes(59);
  //           setSeconds(59)

  //         }
  //       } else {
  //         setHours(hours-1);
  //         setMinutes(59);
  //         setSeconds(59)
  //       }
  //     }else {
  //       setSeconds(seconds-1)
  //     }
  //   console.log(hours,minutes,seconds)

  // },1000);
  // },[])

  // useEffect(() => {
  //   // let myInterval = setInterval(() => {
  //   //         if (seconds > 0) {
  //   //             setSeconds(seconds - 1);
  //   //         }
  //   //         if (seconds === 0) {
  //   //             if (minutes === 0) {
  //   //                 clearInterval(myInterval)
  //   //             } else {
  //   //                 setMinutes(minutes - 1);
  //   //                 setSeconds(59);
  //   //             }
  //   //         }
  //   //     }, 1000)
  //   //     return ()=> {
  //   //         clearInterval(myInterval);
  //   //       };
  // });

  // useEffect(()=>{
  //   let major = getCurrentPrayer(selectedItem.timings);
  //   setTimeout(()=>{
  //     let data = getCurrentPrayer(selectedItem.timings);
  //     setTime({hours: data.diff - 1, minutes: 59, seconds: 59});
  //     // let myInterval = setInterval(() => {
  //     //   if (time.seconds > 0) {
  //     //     setTime({
  //     //       hours: time.hours,
  //     //       minutes: time.minutes,
  //     //       seconds: time.seconds - 1,
  //     //     });
  //     //   }
  //     //   if (time.seconds === 0) {
  //     //     if (time.minutes === 0) {
  //     //       if (time.hours === 0) {
  //     //         clearInterval(myInterval);
  //     //       } else {
  //     //         setTime({
  //     //           hours: time.hours - 1,
  //     //           minutes: 59,
  //     //           seconds: 59,
  //     //         });
  //     //       }
  //     //     } else {
  //     //       setTime({
  //     //         hours: time.hours,
  //     //         minutes: time.minutes - 1,
  //     //         seconds: 59,
  //     //       });
  //     //     }
  //     //   }
  //     // },1000);
  //   },major.diff*3600000);
  // },[])

  // useEffect(() => {
  //     let secTimer = setInterval( () => {
  //       setDt(new Date().toLocaleTimeString())
  //       console.log("dt",new Date().toLocaleTimeString())
  //     },1000)

  //     return () => clearInterval(secTimer);
  // }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar  backgroundColor={COLORS.TRANSPARENT} translucent={true} barStyle="light-content" />
      <ImageBackground
        resizeMode="cover"
        style={{width: '100%', height: '100%', marginBottom: 20}}
        source={require('../../Assets/Images/Intro/background.jpg')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: '10%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.APP_COLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 25, height: 25, alignSelf: 'center'}}
              source={require('../../Assets/Images/Icons/info.png')}
            />
          </View>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: 22,
              fontWeight: '600',
              color: COLORS.WHITE,
            }}>
            {t('AppTitle')}
          </Text>
          <TouchableOpacity
            // onPress={() => props.onClose()}
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.APP_COLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 30, height: 30, alignSelf: 'center'}}
              source={require('../../Assets/Images/Icons/notification.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '600',
              color: COLORS.WHITE,
              marginTop: 10,
            }}>
             { `${nextPrayer?.name} in`}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 40,
              fontWeight: '800',
              color: COLORS.WHITE,
              marginTop: 10,
            }}>
            {`${hours}:${minutes}:${seconds}`}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;
