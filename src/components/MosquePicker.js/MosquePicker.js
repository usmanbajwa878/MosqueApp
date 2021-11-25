import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../constants/AppConstants';
import {mosqueData} from '../../Data/mosqueData';
import {
  actionAddMosque,
  actionSelectMosque,
  actionAddtoFavourite,
} from '../../store/actions/mosqueActions';
import MosqueDetails from '../mosqueDetails/MosqueDetails';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MosquePicker = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const mosqueDetails = useSelector(state => state.mosque.mosqueList);
  const [listData, setListData] = useState(mosqueDetails);
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedtoShow, setSelectedToShow] = useState(null);

  const handleSelected = item => {
    const previousList = [...listData];
    const index = previousList.findIndex(
      listItem => listItem.title === item.title,
    );
    previousList.map(itemList => (itemList.selected = false));
    previousList[index].selected = true;

    setListData(previousList);
  };

  const handleSelect = (item) => {
    // if(selectedItem === null || !selectedItem) {
    //   item.selected = true;
    //   dispatch(actionAddMosque(item));
    // }else {
    //   item.selected = true;
    //   dispatch(actionSelectMosque(item)).then(()=>{
    //     props.navigation.push('HomeStack')
    //   })
    // }
    item.selected = true;
    dispatch(actionAddtoFavourite(item));
  };

  const handleInputChange = text => {
    console.log('TEXT', text);
    console.log('list', listData);
    const filtered_data = listData.filter((item, index) => {
      console.log('ITEM', item.name);
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.city.toLowerCase().includes(text.toLowerCase())
      );
    });
    if (filtered_data.length > 0 && text.length > 0) {
      setShowList(true);
      setListData(filtered_data);
    } else {
      if (text.length > 0) {
        setShowList(false);
      } else {
        setShowList(false);
        setListData(mosqueDetails);
      }
    }
  };

  useEffect(() => {
    console.log('MOSQUE DATA ', mosqueDetails);
  });

  return (
    <View style={styles.container}>
      <Image
        style={{width: 150, height: 150, alignSelf: 'center'}}
        source={require('../../Assets/Images/Icons/navigation.png')}
      />

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',  color:COLORS.BLACK}}>
          {t('AddYourMainMosque')}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={false}
          // onFocus={() => setShowList(true)}
          onChangeText={text => handleInputChange(text)}
          // onChangeText={(text)=>text.length >=3 && handleInputChange(text)}
          placeholder={t('pickerPlaceholder')}
          style={{height: 40, width: SCREEN_WIDTH - 100,  color:COLORS.BLACK}}
        />
        <View>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../Assets/Images/Icons/currentLocation.png')}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            width: SCREEN_WIDTH - 40,
            marginHorizontal: 20,
          }}>
          {showList ? (
            listData.map(item => (
              <View style={styles.itemContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 3,
                    marginTop: 3,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={{
                      backgroundColor: 'white',
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: COLORS.APP_COLOR,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 25, height: 25, alignSelf: 'center'}}
                      source={require('../../Assets/Images/Icons/bookmark.png')}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      fontWeight: '800',
                      color: COLORS.WHITE,
                    }}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDetails(true);
                      setSelectedToShow(item)
                    }}
                    style={{
                      backgroundColor: 'white',
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: COLORS.APP_COLOR,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 30, height: 30, alignSelf: 'center'}}
                      source={require('../../Assets/Images/Icons/info.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 17,
                      fontWeight: '800',
                      color: COLORS.WHITE,
                    }}>
                    <Text style={{fontWeight: '400', fontSize: 15}}>
                      t{'Jumma'}{' '}
                    </Text>
                    {`${item.timings[5].time}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 0.5,
                    marginTop: 10,
                    borderTopColor: COLORS.LIGHT_GREY,
                    padding: 10,
                  }}>
                  {item.timings.map((prayer, index) => {
                    if (index < 5) {
                      return (
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            marginLeft: 10,
                            color: COLORS.WHITE,
                            textDecorationLine:
                              index === 3 ? 'underline' : 'none',
                            textDecorationStyle: 'solid',
                          }}>
                          {prayer.time}
                        </Text>
                      );
                    }
                  })}
                  {showDetails && (
                    <Modal
                      onDismiss={() => setShowDetails(false)}
                      animationType="slide">
                      <MosqueDetails
                        item={selectedtoShow}
                        onClose={() => setShowDetails(false)}
                      />
                    </Modal>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text
              style={{fontSize: 14, fontWeight: '500', textAlign: 'justify',  color:COLORS.BLACK}}>
                    {t('SearchText')}
            </Text>
          )}
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.APP_COLOR,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: COLORS.APP_COLOR,
  },
  inputContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 50,
  },
});

export default MosquePicker;
