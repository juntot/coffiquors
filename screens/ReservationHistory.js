import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {APP_URL} from '../config';
import {layoutStyle, colorStyle} from '../theme';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const ReservationHistory = () => {
  const [reserveList, setReserveList] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    getData();

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const getData = async () => {
    let uuid = await AsyncStorage.getItem('@uuid');

    axios
      .get(`${APP_URL}/api/get-reservations/${uuid}`)
      .then(res => {
        setReserveList(res.data);
      })
      .catch(er => console.log(er));
  };

  const order_list = () => {
    return reserveList.map(data => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            marginTop: 8,
          }}
          key={data.id}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: undefined,
              backgroundColor: 'white',
              borderRadius: 8,
            }}>
            <View
              style={{
                padding: 15,
                // paddingLeft: 5,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    paddingBottom: 0,
                    color: colorStyle.gold2,
                    fontWeight: 'bold',
                  }}>
                  Date :{' '}
                  <Text style={{color: colorStyle.gray}}>
                    {moment(data.book_date).format('ddd MMM DD, YYYY')} {'\n'}
                  </Text>
                  Name :{' '}
                  <Text style={{color: colorStyle.gray}}>
                    {data.name || ''} {'\n\n'}
                  </Text>
                  Time :{' '}
                  <Text style={{color: colorStyle.gray}}>
                    {moment(data.book_time, 'HH:mm:ss').format('HH:mm a')}
                    {'\n'}
                  </Text>
                  Total Seats :{' '}
                  <Text style={{color: colorStyle.gray}}>
                    {data.seats || 0}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <>
      <View style={layoutStyle.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{...layoutStyle.container}}>{order_list()}</View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ReservationHistory;
