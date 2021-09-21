import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../redux/actions/cartAction';
import {
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Button,
} from 'react-native';
import {BorderlessButton, ScrollView} from 'react-native-gesture-handler';
import {layoutStyle, styles, colorStyle} from '../theme';
import BottomNav from './shared/BottomNav';
import ProdCart from './shared/ProdCart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_CURRENCY} from '../config';

const Cart = ({route, navigation, state, increment, decrement, deleteItem}) => {
  const cartList = () => {
    let list = state.cart.map((cart, index) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{paddingTop: 8, borderRadius: 50, elevation: 3}}
          onPress={() => {}}
          key={cart.uuid}>
          <View style={styles.cardContainer}>
            <ProdCart data={cart} plus={plus} minus={minus} remove={remove} />
          </View>
        </TouchableOpacity>
      );
    });
    return list;
  };

  const plus = (obj) => {
    // let newObj = qty;

    increment(obj);
    // console.log(obj);
  };

  const minus = (obj) => {
    // console.log(obj);
    decrement(obj);
  };

  const remove = (obj) => {
    deleteItem(obj);
  };
  const subTotal = () => {
    let total = 0;
    state.cart.forEach((cart) => {
      total += cart.price * cart.qty;
    });
    return total;
  };

  return (
    <>
      <View style={layoutStyle.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{...layoutStyle.container, marginBottom: 149}}>
              {cartList()}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width: '100%',
            bottom: 57,
            padding: 15,
            borderWidth: 2,
            borderLeftColor: colorStyle.white,
            borderRightColor: colorStyle.white,
            borderBottomColor: colorStyle.gold2,
            borderTopColor: undefined,
            // height: 80
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: colorStyle.gray}}>Total</Text>
              <Text style={{color: colorStyle.black1, fontWeight: 'bold'}}>
                {APP_CURRENCY}
                {subTotal()}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  paddingVertical: 15,
                  backgroundColor: colorStyle.gold2,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  elevation: 3,
                }}
                disabled={subTotal() <= 0}
                onPress={() => {
                  navigation.navigate('checkout', {
                    title: 'Checkout',
                    totalprice: subTotal(),
                  });
                }}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: colorStyle.white, paddingRight: 15}}>
                    Checkout
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    color="white"
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <BottomNav navigation={navigation} />
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
