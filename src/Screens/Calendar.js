import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header/Header';
import {COLORS, Months, nDays, WeekDays} from '../constants/AppConstants';
import {HomeData} from '../Data/mosqueData';
import { getHijri } from '../utilities/methods';

function useForceUpdate(){
  const [value,setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


console.log("HIJRI",getHijri().split(','))

const Calender = props => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [showBorder,setShowBorder] = useState(false);
  const forceUpdate = useForceUpdate();
  let matrix = [];

  // useEffect(() => {
  //   matrix = generateMatrix();
  // },[change]);


  const generateMatrix = () => {
    matrix[0] = WeekDays;
    let year = activeDate.getFullYear();
    let month = activeDate.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let maxdays = nDays[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 == 0) || year % 400 == 0) {
        maxdays += 1;
      }
    }
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxdays) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  };
  matrix = generateMatrix();

  const handleDatepress = item => {
    setActiveDate(prevDate => {
      if (!item.match && item != -1) {
        prevDate.setDate(item);
        return prevDate;
      }
    });
    forceUpdate()
  };

  const changeMonth = n => {
    setActiveDate(prevMonth => {
      prevMonth.setMonth(prevMonth.getMonth() + n);
   
      return prevMonth;
    });
    forceUpdate()
 
  };
  const getBorderWidth = (date) =>{
    let borderWidth = 0
    if( new Date().getMonth() === activeDate.getMonth() && new Date().getDate() === date){
      borderWidth = 1
    }
    return borderWidth
    
  }

  let rows = [];
  rows = matrix.map((row, rowIndex) => {
    let rowItems = row.map((item, collIndex) => {
      console.log("item",item,activeDate)
      return (
        <Text
          style={{
            flex: 1,
            height: 30,
            textAlign: 'center',
            backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
            color: collIndex == 0 ? '#a00' : '#000',
            fontWeight: item == activeDate.getDate() ?   'bold' :'500',
            fontSize:item == activeDate.getDate() ? 20 : 15,
            borderWidth: getBorderWidth(item) ? 1 : 0,
            borderRadius:20,
            padding:4
          }}
          onPress={() => handleDatepress(item)}>
          {item != -1 ? item : ''}
          {/* {`(${getHijri(activeDate).toString().split(',')[0]})`} */}
        </Text>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {rowItems}
      </View>
    );
  });

  return (
    <View style={styles.container}>

      <View style={styles.homeContainer}>
        <View
          style={{
            flexDirection: 'row',
            // marginHorizontal: 10,
            marginTop: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom:10
          }}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Image
              resizeMode="contain"
              style={{width: 30, height: 30}}
              source={require('../Assets/Images/Icons/back.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              textAlign: 'center',
              color:COLORS.BLACK
            }}>
            {`${Months[activeDate.getMonth()]} ` }
            {`${activeDate.getFullYear()}`}
            <Text style={{fontSize:16,  color:COLORS.BLACK}}>
            {`(${getHijri(activeDate)})`}
            </Text>
          </Text>
          <TouchableOpacity onPress={() => changeMonth(+1)}>
            <Image
              resizeMode="contain"
              style={{width: 30, height: 30}}
              source={require('../Assets/Images/Icons/forward.png')}
            />
          </TouchableOpacity>
        </View>

        {rows}
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

export default Calender;
