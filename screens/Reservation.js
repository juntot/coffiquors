/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {layoutStyle, colorStyle, fromStyle} from '../theme';
import BottomNav from './shared/BottomNav';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-ui-xg';

import moment from 'moment';
import {APP_URL} from '../config';
import axios from 'axios';
import PopUp from './shared/PopUp';

let source = '';
const Reservation = ({navigation}) => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );
  const [showLoader, setShowLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [defaultDate, setDefaultDate] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [seats, setSeats] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    source = axios.CancelToken.source();
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 80);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });

    deviceData();

    // clearn up ==========================================
    return function () {
      // unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const onChangePicker = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDefaultDate(currentDate);
    if (mode === 'date') {
      setDate(currentDate);
    } else {
      setTime(currentDate);
    }

    // console.log(event);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setDate(date || new Date());
    showMode('date');
  };

  const showTimepicker = () => {
    setTime(time || new Date());
    // console.log(time);
    showMode('time');
  };

  const deviceData = async () => {};

  const bookNow = async () => {
    const value = await AsyncStorage.getItem('@uuid');
    const selectedDate = moment(date).format('YYYY-MM-DD');
    const selectedTime = moment(time).format('HH:mm:ss');
    if (value) {
      let params = {
        uuid: value,
        name: name,
        contact: contact,
        date: selectedDate,
        time: selectedTime,
        seats: seats,
      };

      if (
        date === '' ||
        time === '' ||
        name === '' ||
        contact === '' ||
        seats === ''
      ) {
        setIsSuccess(false);
        setMsg(
          'Sorry! We are unable to process your request please try again.',
        );
        setShowLoader(true);
        return;
      }
      // console.log(APP_URL, params);
      axios
        .post(APP_URL + '/api/reservation', params, {
          cancelToken: source.token,
        })
        .then(res => {
          setIsSuccess(true);
          setMsg(`Horray! We can't wait to serve you.
You're successfully booked on this schedule.

Date: ${selectedDate}
Time: ${selectedTime}
Total Seats: ${seats}`);
          setShowLoader(true);
        })
        .catch(e => {
          setIsSuccess(false);
          setMsg(
            'Sorry! We are unable to process your request please try again.',
          );
          setShowLoader(true);
        });
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          maxHeight: orientation,
          backgroundColor: colorStyle.black3,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* <StatusBar backgroundColor={colorStyle.black1}  /> */}
          <View style={{...layoutStyle.root}}>
            <View style={layoutStyle.container}>
              <TextInput
                style={fromStyle.input}
                underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor={colorStyle.gold2}
                autoCapitalize="none"
                onChangeText={text => setName(text)}
                value={name}
              />
              <TextInput
                style={fromStyle.input}
                underlineColorAndroid="transparent"
                placeholder="Contact Number"
                placeholderTextColor={colorStyle.gold2}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={text => setContact(text)}
                value={contact}
                maxLength={14}
              />
              {/* <Pressable onPress={showDatepicker}> */}
              {/* <View pointerEvents="none"> */}

              {Platform.OS === 'ios' ? (
                <TextInput
                  style={fromStyle.input}
                  underlineColorAndroid="transparent"
                  placeholder="Date"
                  placeholderTextColor={colorStyle.gold2}
                  autoCapitalize="none"
                  // editable={false}
                  // onBlur={() => setShow(false)}
                  // onFocus={showDatepicker}
                  // value={date ? moment(date).format('YYYY-MM-DD') : ''}
                  value={date || ''}
                  onChangeText={text => setDate(text)}
                />
              ) : (
                <TextInput
                  style={fromStyle.input}
                  underlineColorAndroid="transparent"
                  placeholder="Date"
                  placeholderTextColor={colorStyle.gold2}
                  autoCapitalize="none"
                  editable={false}
                  // value={date ? moment(date).format('YYYY-MM-DD') : ''}
                  value={date || ''}
                  onChangeText={text => setDate(text)}
                />
              )}

              {/* </View> */}
              {/* </Pressable>
              <Pressable onPress={showTimepicker}> */}
              {/* <View pointerEvents="none"> */}

              {Platform.OS === 'ios' ? (
                <TextInput
                  style={fromStyle.input}
                  underlineColorAndroid="transparent"
                  placeholder="Time"
                  placeholderTextColor={colorStyle.gold2}
                  autoCapitalize="none"
                  // editable={false}
                  // onBlur={() => setShow(false)}
                  // onFocus={showTimepicker}
                  // value={time ? moment(time).format('HH:mm A') : ''}
                  value={time || ''}
                  onChangeText={text => setTime(text)}
                />
              ) : (
                <TextInput
                  style={fromStyle.input}
                  underlineColorAndroid="transparent"
                  placeholder="Time"
                  placeholderTextColor={colorStyle.gold2}
                  autoCapitalize="none"
                  editable={false}
                  // value={time ? moment(time).format('HH:mm A') : ''}
                  value={time || ''}
                  onChangeText={text => setTime(text)}
                />
              )}

              {/* </View> */}
              {/* </Pressable> */}
              {/* <TextInput
                style={fromStyle.input}
                underlineColorAndroid="transparent"
                placeholder="Time"
                placeholderTextColor={colorStyle.gold2}
                autoCapitalize="none"
                onFocus={showTimepicker}
                value={time ? moment(time).format('HH:mm A') : ''}
              /> */}

              {/* <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" /> */}

              <TextInput
                style={fromStyle.input}
                underlineColorAndroid="transparent"
                placeholder="Total Seats"
                placeholderTextColor={colorStyle.gold2}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={text => setSeats(text)}
                value={seats}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={() => bookNow()}>
                <View style={{paddingTop: 15}}>
                  <Text
                    style={{
                      backgroundColor: colorStyle.gold2,
                      padding: 12,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  // minimumDate={date}
                  value={defaultDate || new Date()}
                  mode={mode}
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangePicker}
                  // style={{
                  //   position: 'absolute',
                  //   top: 0,
                  //   height: 100,
                  //   left: 0,
                  //   right: 0,
                  //   zIndex: 99999,
                  //   backgroundColor: 'grey',
                  // }}
                  textColor="white"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <DatePicker
        style={{width: 200}}
        date={new Date()}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {
          // this.setState({date: date});
        }}
      /> */}
      <PopUp show={showLoader} success={isSuccess}>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <Text style={{color: colorStyle.black4}}>{msg}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              padding: 10,
              backgroundColor: colorStyle.gold2,
              marginLeft: 0,
              marginTop: 8,
              borderRadius: 4,
              elevation: 8,
            }}
            onPress={() => {
              setShowLoader(!showLoader);
              setName('');
              setContact('');
              setDate('');
              setTime('');
              setSeats('');
              setIsSuccess(false);
            }}>
            <Text style={{color: colorStyle.white, textAlign: 'center'}}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </PopUp>
      <BottomNav navigation={navigation} />
    </>
  );
};

export default Reservation;
