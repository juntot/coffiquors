import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {colorStyle, styles} from '../../theme';

const BottomNav = ({navigation, state}) => {
  const route = useRoute();
  return (
    <View style={styles.bottomtabs}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{padding: 15}}
        onPress={() => {
          navigation.navigate('home', {title: 'home'});
        }}>
        <MaterialCommunityIcons
          name="home-outline"
          color={
            route.name !== 'cart' && route.name !== 'reservation'
              ? colorStyle.white
              : colorStyle.gold2
          }
          size={25}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity activeOpacity={.8} style={{padding: 15}} onPress={()=>{navigation.navigate('user', {title: 'User Profile'})}}><MaterialCommunityIcons name="account-outline" color={colorStyle.gold2} size={25} /></TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{padding: 15, position: 'relative'}}
        onPress={() => {
          navigation.navigate('cart', {title: 'Cart'});
        }}>
        {state.cart.length > 0 ? (
          <View
            style={{
              position: 'absolute',
              right: 4,
              top: 4,
              backgroundColor: colorStyle.red,
              textAlign: 'center',
              padding: 12,
              borderRadius: 50,
              zIndex: 1,
            }}>
            <View
              style={{
                display: 'flex',
                position: 'absolute',
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                height: 24,
              }}>
              <Text style={{color: colorStyle.white}}>
                {state.cart.length > 10
                  ? Math.floor(state.cart.length / 10) + '0+'
                  : state.cart.length}
              </Text>
            </View>
          </View>
        ) : null}
        <MaterialCommunityIcons
          name="cart-outline"
          color={route.name === 'cart' ? colorStyle.white : colorStyle.gold2}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{padding: 15}}
        onPress={() => {
          navigation.navigate('reservation', {title: 'Reservation'});
        }}>
        <MaterialCommunityIcons
          name="calendar-check"
          color={
            route.name === 'reservation' ? colorStyle.white : colorStyle.gold2
          }
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps, null)(BottomNav);
