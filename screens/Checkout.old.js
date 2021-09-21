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
import {APP_URL} from '../config';
import PopUp from './shared/PopUp';

import axios from 'axios';
let source = '';

const Checkout = ({navigation, route, state, resetCart}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    state: state.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
