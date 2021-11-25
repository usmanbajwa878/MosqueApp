import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../constants/AppConstants';
import {actionChangeScheduleNotification} from '../store/actions/notificationActions';
import {
  convertFrom12To24Format,
  convertFrom24To12Format,
  getCurrentPrayer,
  getDayAndDate,
  getHijri,
  getTimeDifference,
} from '../utilities/methods';
import {
  clearNotification,
  scheduleNotif,
} from '../utilities/Notification';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const selectedMosque = useSelector(state => state.mosque.selectedMosque);
  const notifList = useSelector(state => state.notification.scheduleList);
  const timeFormat = useSelector(state => state.time.timeFormat);
  const [nextPrayer, setNextPrayer] = useState();

  const handleSchduleNotif = (item, index) => {
    if (notifList[index].scheduled) {
      clearNotification(notifList[index].notificationId);
      const data = {
        ...notifList[index],
      };
      console.log("clear Data",data)
      dispatch(actionChangeScheduleNotification(data));
    } else {
      const hours = item.time.split(':')[0];
      const minutes = item.time.split(':')[1];
      const time = {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
      };
      const notificationId = scheduleNotif(
        time,
        'Mosque App Reminder',
        `${item.name} Prayer`,
      );
      const data = {
        ...item,
        notificationId:notificationId,
      };
      console.log("Data",data)
      dispatch(actionChangeScheduleNotification(data));
    }
  };

  useEffect(() => {
    let data = getCurrentPrayer(selectedMosque.timings, nextPrayer);
    setNextPrayer(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{fontSize: 18, fontWeight: '600', color: COLORS.APP_COLOR}}>
            {getHijri()}
          </Text>
          <Text
            style={{fontSize: 15, fontWeight: '400', color: COLORS.APP_COLOR}}>
            {getDayAndDate()}
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          {selectedMosque.timings.map(
            (item, index) =>
              index < 5 && (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    alignItems: 'center',
                    height: 40,
                    backgroundColor:
                      nextPrayer?.name === item?.name
                        ? COLORS.LIGHT_GREEN
                        : COLORS.WHITE,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 17,
                        color: COLORS.APP_COLOR,
                        fontWeight: '400',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 20,
                        color: COLORS.APP_COLOR,
                        fontWeight: '600',
                      }}>{`${
                      timeFormat === 24
                        ? convertFrom12To24Format(
                            moment(item.time, 'HH:mm:ss a').format('h:mm a'),
                          )
                        : convertFrom24To12Format(
                            moment(item.time, 'HH:mm:ss a').format('h:mm a'),
                          )
                    }`}</Text>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 14,
                        color: COLORS.APP_COLOR,
                        fontWeight: '400',
                      }}>{` + ${getTimeDifference(item.time)}`}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSchduleNotif(item, index)}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../Assets/Images/Icons/notification.png')}
                    />
                  </TouchableOpacity>
                </View>
              ),
          )}
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 0.4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 30,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  color: COLORS.APP_COLOR,
                  fontWeight: '600',
                }}>
                {timeFormat === 24
                  ? convertFrom12To24Format(
                      moment(
                        selectedMosque.timings[5].time,
                        'HH:mm:ss a',
                      ).format('h:mm a'),
                    )
                  : convertFrom24To12Format(
                      moment(
                        selectedMosque.timings[5].time,
                        'HH:mm:ss a',
                      ).format('h:mm a'),
                    )}
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 18,
                  color: COLORS.APP_COLOR,
                  fontWeight: '400',
                }}>
                {selectedMosque.timings[5].name}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  color: COLORS.APP_COLOR,
                  fontWeight: '600',
                }}>
                {timeFormat === 24
                  ? convertFrom12To24Format(
                      moment(
                        selectedMosque.timings[5].time,
                        'HH:mm:ss a',
                      ).format('h:mm a'),
                    )
                  : convertFrom24To12Format(
                      moment(
                        selectedMosque.timings[6].time,
                        'HH:mm:ss a',
                      ).format('h:mm a'),
                    )}
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 18,
                  color: COLORS.APP_COLOR,
                  fontWeight: '400',
                }}>
                {selectedMosque.timings[6].name}
              </Text>
            </View>
          </View>
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

export default HomeScreen;
