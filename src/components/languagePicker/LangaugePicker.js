import i18next from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import { COLORS } from '../../constants/AppConstants';
import {LanguageData} from '../../Data/languageData';
import {actionChangeLanguage} from '../../store/actions/timeActions';

const LanguagePicker = props => {
  const {t, i18n} = useTranslation();
  const [listData, setListData] = useState(LanguageData);
  const dispatch = useDispatch();
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
    <View style={styles.container}>
      <Image
        style={{width: 150, height: 150, alignSelf: 'center'}}
        source={require('../../Assets/Images/Icons/appIcon.png')}
      />

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',color:COLORS.BLACK}}>
          {t('Select_language')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 10,
            color:COLORS.BLACK
          }}>
          {t('Select_language_text')}
        </Text>
      </View>
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        {listData.map(item => (
          <TouchableOpacity
            onPress={() => handleSelected(item)}
            style={styles.itemContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                style={{width: 30, height: 30, alignSelf: 'center'}}
                source={item.image}
              />
              <Text style={{marginLeft: 10, alignSelf: 'center', color:COLORS.BLACK}}>
                {item.title}
              </Text>
            </View>
            <View style={{width: 20, height: 20, alignSelf: 'center'}}>
              {item.selected && (
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('../../Assets/Images/Icons/checkMark.png')}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    height: '90%',
  },
  itemContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default LanguagePicker;
