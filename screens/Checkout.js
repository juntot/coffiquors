/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../redux/actions/cartAction';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Button,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ScrollView} from 'react-native-gesture-handler';
import {layoutStyle, styles, colorStyle, fromStyle} from '../theme';
import BottomNav from './shared/BottomNav';
import {APP_URL, APP_CURRENCY_WHITE} from '../config';
import PopUp from './shared/PopUp';

import axios from 'axios';
let source = '';

const Checkout = ({navigation, route, state, resetCart}) => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );
  const [showLoader, setShowLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [address, setAddr] = useState('');
  const [contact, setContact] = useState('');
  // const [pickup, setPickup] = useState('');
  const [forPickup, setPickup] = useState(true);

  const [defaultDate, setDefaultDate] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
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

    // clean up ====================================
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
    showMode('time');
  };

  const submitOrder = async () => {
    const uuid = await AsyncStorage.getItem('@uuid');
    const selectedDate = moment(date).format('YYYY-MM-DD');
    const selectedTime = moment(time).format('HH:mm:ss');
    let params = {
      uuid,
      name,
      contact,
      order_date: selectedDate,
      total: route.params.totalprice || 0,
      cart: state,
    };
    console.log(params);
    if (isChecked) {
      params.address = address;
    } else {
      params.pickup = selectedTime;
    }

    if (
      (name === '' || address === '' || contact === '' || date === '') &&
      isChecked
    ) {
      setIsSuccess(false);
      setMsg('Sorry! We are unable to process your request please try again.');
      setShowLoader(true);
      setIsDisable(false);
      return;
    }

    if (
      (name === '' || time === '' || contact === '' || date === '') &&
      !isChecked
    ) {
      setIsSuccess(false);
      setMsg('Sorry! We are unable to process your request please try again.');
      setShowLoader(true);
      setIsDisable(false);
      return;
    }

    await axios
      .post(APP_URL + '/api/add-order', params, {
        cancelToken: source.token,
      })
      .then(res => {
        resetCart();
        setIsSuccess(true);
        setMsg(
          'Horray! Your order has been placed. Thank you for choosing our products',
        );
        setShowLoader(true);
        setIsDisable(false);
      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false);
        setMsg(
          'Sorry! We are unable to process your request please try again.',
        );
        setShowLoader(true);
        setIsDisable(false);
      });
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
                // onBlur={() => setShow(false)}
                value={name}
              />

              <TextInput
                style={fromStyle.input}
                underlineColorAndroid="transparent"
                placeholder="Contact Number"
                placeholderTextColor={colorStyle.gold2}
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={14}
                // onBlur={() => setShow(false)}
                onChangeText={text => setContact(text)}
                value={contact}
              />

              {/* <Pressable onPress={showDatepicker}> */}
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
                  //  value={date ? moment(date).format('YYYY-MM-DD') : ''}
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
                  // editable={false}
                  //  value={date ? moment(date).format('YYYY-MM-DD') : ''}
                  value={date || ''}
                  onChangeText={text => setDate(text)}
                />
              )}

              {/* </View> */}
              {/* </Pressable> */}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  marginBottom: 15,
                }}>
                <CheckBox
                  boxType="square"
                  value={isChecked}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={
                    Platform.OS === 'ios'
                      ? {left: 0, marginRight: 8}
                      : {left: -5}
                  }
                  tintColors={{true: colorStyle.gold2, false: colorStyle.gold2}}
                  onTintColor={colorStyle.gold2}
                  tintColor={colorStyle.gold2}
                  onCheckColor={colorStyle.white}
                  onChange={() => {
                    // setShow(false);
                    setPickup(!forPickup);
                    setIsChecked(!isChecked);
                  }}
                />
                <Text style={{color: colorStyle.gold2}}> For Delivery?</Text>

                <CheckBox
                  boxType="square"
                  value={forPickup}
                  style={
                    Platform.OS === 'ios'
                      ? {left: 25, marginRight: 20}
                      : {left: 15}
                  }
                  tintColors={{true: colorStyle.gold2, false: colorStyle.gold2}}
                  onTintColor={colorStyle.gold2}
                  tintColor={colorStyle.gold2}
                  onCheckColor={colorStyle.white}
                  onChange={() => {
                    setPickup(!forPickup);
                    setIsChecked(!isChecked);
                    // setMode('time');
                    // setShow(true);
                  }}
                />
                <Text style={{color: colorStyle.gold2, left: 20}}>
                  For Pickup?
                </Text>
              </View>
              {
                isChecked ? (
                  <TextInput
                    style={fromStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Address"
                    placeholderTextColor={colorStyle.gold2}
                    autoCapitalize="none"
                    onChangeText={text => setAddr(text)}
                    value={address}
                  />
                ) : Platform.OS === 'ios' ? (
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
                    // editable={false}
                    // onFocus={showTimepicker}
                    // value={time ? moment(time).format('HH:mm A') : ''}
                    value={time || ''}
                    onChangeText={text => setTime(text)}
                  />
                )
                // (
                //   <TextInput
                //     style={fromStyle.input}
                //     underlineColorAndroid="transparent"
                //     placeholder="Pickup Time"
                //     placeholderTextColor={colorStyle.gold2}
                //     autoCapitalize="none"
                //     onBlur={() => setShow(false)}
                //     onFocus={showTimepicker}
                //     value={time ? moment(time).format('HH:mm A') : ''}
                //   />
                //   // <TextInput style = {fromStyle.input}
                //   //   underlineColorAndroid = "transparent"
                //   //   placeholder = "Pickup Time"
                //   //   placeholderTextColor = {colorStyle.gold2}
                //   //   autoCapitalize = "none"
                //   //   onChangeText = {(text)=>setPickup(text)}
                //   //   value={pickup}
                //   //   maxLength = {8}
                //   // />
                // )
              }

              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isDisable}
                onPress={async () => {
                  await setIsDisable(true);
                  await submitOrder();
                }}>
                <View style={{paddingTop: 15}}>
                  <Text
                    style={{
                      backgroundColor: colorStyle.gold2,
                      padding: 12,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Confirm - {APP_CURRENCY_WHITE}
                    {route.params.totalprice || 0}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <PopUp show={showLoader} success={isSuccess}>
              {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                }}>
                <Text style={{color: colorStyle.black4}}>{msg}</Text>

                {isSuccess ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      padding: 10,
                      backgroundColor: colorStyle.gold2,
                      marginLeft: 0,
                      borderRadius: 4,
                      elevation: 8,
                    }}
                    onPress={() => {
                      setShowLoader(!showLoader);
                      navigation.navigate('home');
                    }}>
                    <Text
                      style={{color: colorStyle.white, textAlign: 'center'}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      padding: 10,
                      backgroundColor: colorStyle.gold2,
                      marginLeft: 0,
                      borderRadius: 4,
                      elevation: 8,
                    }}
                    onPress={() => {
                      setShowLoader(!showLoader);
                    }}>
                    <Text
                      style={{color: colorStyle.white, textAlign: 'center'}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* </View> */}
            </PopUp>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                // minimumDate={new Date()}
                value={defaultDate || new Date()}
                mode={mode}
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangePicker}
                // style={{backgroundColor: 'red', color: 'red'}}
                textColor="white"
              />
            )}
          </View>
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    state: state.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
