import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import {COLORS} from '../constants/AppConstants';
import moment from 'moment';

const Data = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];

const PrayerNotification = props => {
  const {t} = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0);

  const notifList = useSelector(state=>state.notification.scheduleList);
  const handleSelect = index => {
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{width: '20%',marginTop:10}}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../Assets/Images/Icons/back.png')}
          />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            marginTop: 10,
            color: COLORS.APP_COLOR,
            width: '50%',
          }}>
          {t('PrayerNotifications')}
        </Text>
        <View style={{width: '35%'}} />
      </View>
      <View >
        <ScrollView style={{marginTop: 20}} horizontal={true}>
          <View style={{flexDirection: 'row'}}>
            {Data.map((item, index) => (
              <TouchableOpacity
              key={index}
                onPress={() => handleSelect(index)}
                style={{
                  borderBottomWidth: index === activeIndex ? 2 : 0,
                  borderBottomColor:
                    index === activeIndex ? COLORS.APP_DIM : '',
                  alignItems: 'center',
                  height: 80,
                  padding: 10,
                  width: 80,
                }}>
                <Text style={{  color:COLORS.BLACK}}>{item}</Text>
                <Image
                style={{width: 30, height: 30,marginTop:5}}
                  source={require('../Assets/Images/Icons/notification.png')}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={{marginTop: 20, flex: 1,marginHorizontal:20}} horizontal={true}>
        {notifList[activeIndex].scheduled ?  
             <Text style={{textAlign:'center',  color:COLORS.BLACK,fontSize:18}}>{`Notification Scheduled at ${moment(notifList[activeIndex].time, 'HH:mm:ss a').format('h:mm a')} for ${notifList[activeIndex].name} Prayer`}</Text>
             :
             <Text style={{textAlign:'center',  color:COLORS.BLACK,fontSize:16}}>{t('notificationPlaceholder')}</Text>
        }
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headingContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal:10,
    marginTop:20
  },
  image: {
    width: '90%',
    flex: 1,
    resizeMode: 'contain',
  },
});

export default PrayerNotification;
