import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {View, StyleSheet, Text, ScrollView, Image,Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { COLORS } from '../../constants/AppConstants';
import {LanguageData} from '../../Data/languageData';

const SCREEN_WIDTH = Dimensions.get('window').width

const Welcome = props => {

   const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Image
        style={{width: 150, height: 150, alignSelf: 'center'}}
        source={require('../../Assets/Images/Icons/appIcon.png')}
      />

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',  color:COLORS.BLACK}}>
         {t('WelcomeText')}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          marginHorizontal:10,
          width:SCREEN_WIDTH-40
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold',textAlign:'justify',  color:COLORS.BLACK}}>
        {t('AppInfoText')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    height: '90%',
    alignItems:'center'
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

export default Welcome;
