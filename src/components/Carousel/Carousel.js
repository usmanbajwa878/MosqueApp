import React, {useState, createRef,useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {IntroData} from '../../Data/IntroData';
import {COLORS} from '../../constants/AppConstants';
import CarouselItem from './CarouselItem';
import LanguagePicker from '../languagePicker/LangaugePicker';
import Welcome from '../Welcome/Welcome';
import MosquePicker from '../MosquePicker.js/MosquePicker';
import MosqueDetails from '../mosqueDetails/MosqueDetails';
import { useSelector,useDispatch } from 'react-redux';
import { actionGetMosques, actionUserMoveToHome } from '../../store/actions/mosqueActions';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const {width, height} = Dimensions.get('window');

const Carousel = props => {

  const {t,i18n} = useTranslation()
  const dispatch = useDispatch();
  const favouriteMosque= useSelector(
    state => state.mosque.favouriteMosque,
  );
  
  const getMosqueData = () =>{
    const Data = {
      city:"lahore"
    }

    dispatch(actionGetMosques(Data))
  }

  useEffect(()=>{
    getMosqueData()
  },[]);

  const handleNavigation = () =>{

    dispatch(actionUserMoveToHome(true));

  }


  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollView = createRef();
  const onScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const currentInd = Math.round(contentOffset.x / width);
    if (currentIndex !== currentInd) {
      setCurrentIndex(currentInd);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {IntroData.map((item, i) => (
          <View key={i} style={{position: 'relative'}}>
            {i === 0 && <LanguagePicker />}
            {i === 1 && <Welcome />}
            {i === 2 && <MosquePicker />}
            <View style={styles.dotContainer}>
              {Array.from({length: IntroData.length}).map((_, index) => (
                <View>
                  <View
                    key={index}
                    style={{
                      ...styles.dot,
                      width: currentIndex === index ? 20 : 10,
                      backgroundColor:
                        currentIndex === index
                          ? COLORS.APP_COLOR
                          : 'transparent',
                    }}
                  />
                </View>
              ))}
              {i == 2 && (
                <TouchableOpacity
                disabled={favouriteMosque.length < 0}
                onPress={()=>handleNavigation()}
                  style={{
                    position: 'absolute',
                    right: 20,
                    height: 40,
                    backgroundColor: COLORS.LIGHT_GREY,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    
                  }}>
                  <Text style={{color:COLORS.BLACK}}>{t('Done')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    height: 20,
    width: width,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 1,
  },
  dot: {
    borderRadius: 10,
    height: 10,
    width: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.APP_COLOR,
  },
});

export default Carousel;
