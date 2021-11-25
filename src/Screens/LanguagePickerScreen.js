import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
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
import Header from '../components/Header/Header'; 
import {COLORS} from '../constants/AppConstants';
import {LanguageData} from '../Data/languageData';
import {actionChangeLanguage} from '../store/actions/timeActions';
import {useDispatch} from 'react-redux';

const Data = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];

const LanguagePicker = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [listData, setListData] = useState(LanguageData);

  const handleSelected = item => {
    const previousList = [...listData];
    const index = previousList.findIndex(
      listItem => listItem.title === item.title,
    );
    previousList.map(itemList => (itemList.selected = false));
    previousList[index].selected = true;
    i18n.changeLanguage(item.value);
    dispatch(actionChangeLanguage(item.value));
    setListData(previousList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{width: '20%', marginTop: 10}}>
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
          {t('LanguageSelection')}
        </Text>
        <View style={{width: '20%'}} />
      </View>

      <ScrollView style={{marginTop: 20, backgroundColor: COLORS.WHITE}}>
        <View style={{marginHorizontal: 10}}>
          {listData.map((item,index) => (
            <TouchableOpacity
            key={index}
              onPress={() => handleSelected(item)}
              style={styles.itemContainer}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="contain"
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                  source={item.image}
                />
                <Text style={{marginLeft: 10, alignSelf: 'center',  color:COLORS.BLACK}}>
                  {item.title}
                </Text>
              </View>
              <View style={{width: 20, height: 20, alignSelf: 'center'}}>
                {item.selected && (
                  <Image
                    resizeMode="contain"
                    style={{height: 25, width: 25}}
                    source={require('../Assets/Images/Icons/checkMark.png')}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headingContainer: {
    marginTop: 20,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    flex: 1,
    resizeMode: 'contain',
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default LanguagePicker;
