import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import Header from '../components/Header/Header';
import {COLORS} from '../constants/AppConstants';
import {HomeData} from '../Data/mosqueData';
import {useSelector, useDispatch} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMapOptions } from '../utilities/methods';
import {Popup } from 'react-native-map-link';
import { actionAddtoFavourite } from '../store/actions/mosqueActions';
import { useTranslation } from 'react-i18next';

const FavouriteScreen = props => {

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const favouriteMosqueList = useSelector(
    state => state.mosque.favouriteMosque,
  );

  const [list, setList] = useState(favouriteMosqueList);
  const [showMap,setShowMap] = useState(false);
  const [selectedItem,setSelectedItem] = useState(null);

  const handleSelected = (item) =>{
    item.selected = true
    dispatch(actionAddtoFavourite(item)).then(()=>{
      setList(favouriteMosqueList)
    })
  };


  return (
    <View style={styles.container}>
       {showMap &&  <Popup
                          isVisible={showMap}
                          onCancelPressed={() => setShowMap(false)}
                          onAppPressed={() => setShowMap(false)}
                          onBackButtonPressed={() => setShowMap(false)}
                          options={getMapOptions(selectedItem.latitude,selectedItem.longitude,selectedItem.name)}
                        />
                    }
      {/* <View style={{height: '30%'}}>
        <Header />
      </View> */}

      <View style={styles.homeContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Text
            style={{fontSize: 18, fontWeight: '600', color: COLORS.APP_COLOR}}>
           {t('FavouriteMosque')}
          </Text>
          {/* <Image source={require('../Assets/Images/Icons/')}/> */}
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          {list.map((item,index )=> (
            <View
            key={index}
              style={{
                borderWidth: 1,
                height: 150,
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: COLORS.APP_DIM,
                borderColor: COLORS.WHITE,
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 110,
                  borderRadius: 20,
                  backgroundColor: COLORS.APP_COLOR,
                }}>
                <ImageBackground
                  resizeMode="cover"
                  source={require('../Assets/Images/Icons/mosque.jpg')}
                  style={{
                    height: 80,
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                  onPress={()=>handleSelected(item)}
                    style={{
                      backgroundColor: COLORS.WHITE,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.selected ? (
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../Assets/Images/Icons/ramzan.png')}
                      />
                    ) : (
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../Assets/Images/Icons/call.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=>{
                    setSelectedItem(item);
                    setShowMap(true)
                  
                  }}
                    style={{
                      backgroundColor: COLORS.WHITE,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../Assets/Images/Icons/navigation.png')}
                    />
                  </TouchableOpacity>
                
                </ImageBackground>
                <View
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: 14,
                      textAlign: 'center',
                      paddingVertical: 2,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                  paddingHorizontal: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: COLORS.APP_COLOR,
                      paddingRight: 8,
                    }}>
                    {item.timings[0].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: COLORS.APP_COLOR,
                    }}>
                    {item.timings[0].time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.APP_COLOR,
                    }}>
                    +0
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: COLORS.APP_COLOR,
                      paddingRight: 8,
                    }}>
                    {item.timings[5].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: COLORS.APP_COLOR,
                    }}>
                    {item.timings[5].time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
});

export default FavouriteScreen;
