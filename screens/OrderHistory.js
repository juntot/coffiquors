/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../redux/actions/cartAction';
import {View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {APP_URL} from '../config';
import {layoutStyle, colorStyle} from '../theme';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const OrderHistroy = ({addCart}) => {
  const navigation = useNavigation();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    getData();

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const getData = async () => {
    const uuid = await AsyncStorage.getItem('@uuid');
    axios
      .get(`${APP_URL}/api/get-orders/${uuid}`)
      .then(res => {
        setOrderList(res.data);
      })
      .catch(er => console.log(er));
  };

  const addToCart = val => {
    // let total = val.price * qty;
    addCart(val);
    navigation.goBack();
  };

  const order_list = () => {
    return orderList.map(data => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            marginTop: 8,
          }}
          key={data.detail_id}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: undefined,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'white',
                padding: 4,
              }}>
              <Image
                resizeMode="contain"
                style={{width: undefined, height: undefined, flex: 1}}
                // source={require('../../assets/img/coffee-02.png')}
                source={{uri: data.imgUrl || null}}
              />
            </View>
            <View
              style={{
                padding: 15,
                paddingLeft: 5,
                paddingRight: 5,
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
                  {data.title || ''} - ${data.price || ''}
                </Text>
                <Text>
                  Date: {moment(data.date_added).format('MMM DD, YYYY') || ''}
                </Text>
                <Text
                  numberOfLines={2}
                  style={
                    {
                      // marginLeft: 8, marginRight: 8,
                      // color: colorStyle.black4,
                      // paddingTop: 4,
                    }
                  }>
                  Qty: {data.qty || ''}
                </Text>
                <Text
                  style={
                    {
                      // marginLeft: 8, marginRight: 8
                    }
                  }>
                  Total: ${data.total || ''}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    // alignItems: 'flex-start',
                  }}>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        display: 'flex',
                        backgroundColor: colorStyle.gold2,
                        height: '100%',
                        elevation: 1,

                        // flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                      }}
                      onPress={() => {
                        addToCart(data);
                      }}>
                      <Text
                        style={{
                          // flex: 1,
                          textAlignVertical: 'center',
                          color: colorStyle.white,
                          padding: 8,
                        }}>
                        Reorder
                      </Text>
                    </TouchableOpacity>
                    {/* <Text numberOfLines={2} style={{
                                            marginLeft: 8, marginRight: 8,
                                            // color: colorStyle.black4,
                                            paddingTop: 4,
                                        }}>
                                            Qty: {data.qty || ''}
                                        </Text>
                                        <Text style={{marginLeft: 8, marginRight: 8}}>
                                            Total: ${data.total || ''}
                                        </Text> */}
                  </View>
                </View>
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

export default connect(null, mapDispatchToProps)(OrderHistroy);
