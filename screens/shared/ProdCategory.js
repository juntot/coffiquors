import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {styles} from '../../theme';

const ProdCategory = ({navigation, navlink, title, imgUrl, route}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{...styles.card}}
      onPress={() => {
        navigation.navigate(navlink, {title: title, route: route});
      }}>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View style={{width: '100%', height: 60}}>
          <Image
            resizeMode="contain"
            style={{width: undefined, height: undefined, flex: 1}}
            resizeMode="contain"
            source={{uri: imgUrl || null}}
          />
        </View>
        <Text style={styles.cardText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProdCategory;
