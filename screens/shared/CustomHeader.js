import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, TouchableOpacity} from 'react-native';
import {colorStyle} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({title, path}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          // backgroundColor: 'blue',
          flexGrow: 1,
          marginRight: 18,
        }}>
        <Text
          style={{
            color: colorStyle.white,
            fontWeight: 'bold',
            fontSize: 20,
            // width: '100%',
            textAlign: 'center',
          }}>
          {title || ''}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 120,
          // backgroundColor: 'red',
        }}
        onPress={() => {
          navigation.navigate(path);
        }}>
        <MaterialCommunityIcons
          name="clock-outline"
          color={colorStyle.gold2}
          size={27}
        />
      </TouchableOpacity>
    </View>
    // <>
    //   <View
    //     style={{
    //       flex: 1,
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       width: '100%',
    //     }}>
    //     <Text
    //       style={{
    //         color: colorStyle.white,
    //         fontWeight: 'bold',
    //         fontSize: 20,
    //         width: '100%',
    //         textAlign: 'center',
    //       }}>
    //       {title || ''}
    //     </Text>
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.navigate(path);
    //       }}>
    //       <MaterialCommunityIcons
    //         name="clock-outline"
    //         color={colorStyle.gold2}
    //         size={27}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // </>
  );
};

export default CustomHeader;
