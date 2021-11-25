import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {View, StyleSheet, Image, ScrollView, Text, Switch,TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import {COLORS} from '../constants/AppConstants';
import {HomeData} from '../Data/mosqueData';
import { actionChangeFormat } from '../store/actions/timeActions';
import { getActiveLanguageIcon } from '../utilities/methods';


const SettingScreen = props => {

  const timeFormat = useSelector(state=>state.time.timeFormat);
  const activeLangauge = 'English' ||useSelector(state=>state.time.activeLangauge);

  const dispatch = useDispatch();
  const {t} = useTranslation()
  const [isEnabled, setIsEnabled] = useState(timeFormat ===12 ? false:true );
  const toggleSwitch = () => {
    if(isEnabled){
      dispatch(actionChangeFormat(12))
    }else {
      dispatch(actionChangeFormat(24))
    }
    setIsEnabled(previousState => !previousState)
  };
  return (
    <View style={styles.container}>
      {/* <View style={{height: '30%'}}>
        <Header />
      </View> */}

      <View style={styles.homeContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/clock.png')}
            />
            <Text style={styles.text}>{t('TimeFormat')}</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={isEnabled ? 'green' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginHorizontal: 20,
            marginTop: 2,
          }}>
          <Text style={{fontSize: 12,  color:COLORS.BLACK}}>12H </Text>
          <Text style={{fontSize: 12,  color:COLORS.BLACK}}>24H </Text>
        </View>

        <TouchableOpacity onPress={()=>props.navigation.push('LanguagePicker')} style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/language.png')}
            />
            <Text style={styles.text}>{t('Language')}</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Image
              style={styles.flagIcon}
              source={getActiveLanguageIcon(activeLangauge)}
            />
            <Text style={{fontSize:14,marginHorizontal:10,  color:COLORS.BLACK}}>{activeLangauge}</Text>
            <Image
              style={{width:24,height:24,marginLeft:5}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>props.navigation.push('PrayerNotifications')}  style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/notification.png')}
            />
            <Text style={styles.text}>{t('PrayerNotifications')}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Image
              style={{width:24,height:24,marginLeft:5}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/donate.png')}
            />
            <Text style={styles.text}>{t('DonatetoMosqueApp')}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Image
              style={{width:24,height:24,marginLeft:5}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/rate.png')}
            />
            <Text style={styles.text}>{t('RateourApp')}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Image
              style={{width:24,height:24,marginLeft:5}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Image
              style={styles.icon}
              source={require('../Assets/Images/Icons/aboutus.png')}
            />
            <Text style={styles.text}>{t('Aboutus')}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Image
              style={{width:24,height:24,marginLeft:5}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  itemContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    color:COLORS.BLACK
  },
});

export default SettingScreen;
