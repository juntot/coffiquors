import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorStyle, styles} from '../../theme';
import {APP_CURRENCY} from '../../config';

const ProdCart = ({data, ...props}) => {
  const [qty, setQty] = useState(data.qty || 1);

  const minus = () => {
    if (props.hasOwnProperty('minus')) {
      if (qty > 1) {
        setQty((qty) => {
          return qty - 1;
        });
        props.minus({...data, qty: qty - 1});
      }
      if (props.hasOwnProperty('remove') && qty <= 1) {
        props.remove(data);
      }
    }
  };

  const plus = () => {
    if (props.hasOwnProperty('plus')) {
      setQty((qty) => {
        return qty + 1;
      });
      props.plus({...data, qty: qty + 1});
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: undefined,
          backgroundColor: 'white',
        }}>
        <View
          style={{width: 70, height: 70, backgroundColor: 'white', padding: 4}}>
          <Image
            resizeMode="contain"
            style={{width: undefined, height: undefined, flex: 1}}
            resizeMode="contain"
            // source={ require('../../assets/img/coffee-02.png') }
            source={{uri: data.imgUrl || null}}
          />
        </View>
        <View
          style={{
            padding: 15,
            paddingLeft: 5,
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
              {data.title || ''}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                paddingBottom: 0,
                paddingRight: 0,
                color: colorStyle.black4,
                paddingTop: 4,
              }}>
              {APP_CURRENCY}
              {data.price || ''}
            </Text>
          </View>
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={minus}>
                <MaterialCommunityIcons
                  name="minus"
                  color={colorStyle.gray}
                  size={22}
                />
              </TouchableOpacity>
              <Text style={{marginLeft: 8, marginRight: 8}}>{qty}</Text>
              <TouchableOpacity onPress={plus}>
                <MaterialCommunityIcons
                  name="plus"
                  color={colorStyle.gray}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProdCart;
