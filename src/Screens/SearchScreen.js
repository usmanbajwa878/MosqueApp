import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Header from '../components/Header/Header';
import {COLORS} from '../constants/AppConstants';
import MosqueDetails from '../components/mosqueDetails/MosqueDetails';
import {useSelector, useDispatch} from 'react-redux';
import {actionSelectMosque} from '../store/actions/mosqueActions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SearchScreen = props => {

  const {t} = useTranslation()

  const mosqueData = useSelector(state =>state.mosque.mosqueList);
  const dispatch = useDispatch();
  const [listData, setListData] = useState(mosqueData);
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedToShow, setSelectedToShow] = useState();

  const handleSelect = item => {
    dispatch(actionSelectMosque(item));
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
        setListData(mosqueData);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={{height: '30%'}}>
        <Header />
      </View> */}

      <View style={styles.homeContainer}>
        <View style={{marginHorizontal: 20}}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text)=>handleInputChange(text)}
              placeholder="Type Paris,Mosque etc"
              style={{height: 40, width: SCREEN_WIDTH - 100,color:COLORS.BLACK}}
            />
            <View>
              <Image
                style={{width: 24, height: 24}}
                source={require('../Assets/Images/Icons/search.png')}
              />
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                width: SCREEN_WIDTH - 40,
                // marginHorizontal: 20,
              }}>
              {showList ? (
                listData.map((item,index) => (
                  <View key={index} style={styles.itemContainer}>
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
                          source={require('../Assets/Images/Icons/bookmark.png')}
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
                          setSelectedToShow(item);
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
                          source={require('../Assets/Images/Icons/info.png')}
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
                        <Text style={{fontWeight: '400', fontSize: 15,color:COLORS.WHITE}}>
                          Jumua{' '}
                        </Text>
                        {`${ moment(item.timings[5].time, "HH:mm:ss").format("hh:mm A")}`}
                       
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
                      {item.timings.map((prayer, index) =>
                      
                      {
                        if (index < 5) {
                          return (
                            <Text
                            key={index}
                              style={{
                                fontSize: 12,
                                fontWeight: '400',
                                marginLeft: 10,
                                color: COLORS.WHITE,
                                textDecorationLine:
                                  index === 3 ? 'underline' : 'none',
                                textDecorationStyle: 'solid',
                              }}>
                              {moment(prayer.time, "HH:mm:ss").format("hh:mm A")}
                            </Text>
                          );
                        }
                      }
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    textAlign: 'justify',
                    color:COLORS.BLACK
                  }}>
                  {t('SearchText')}
                </Text>
              )}
            </View>
          </ScrollView>
          {showDetails && (
            <Modal
              onDismiss={() => setShowDetails(false)}
              animationType="slide">
              <MosqueDetails
                item={selectedToShow}
                onClose={() => setShowDetails(false)}
              />
            </Modal>
          )}
        </View>
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

export default SearchScreen;
