import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {layoutStyle, colorStyle, fromStyle, styles} from '../../theme';
import axios from 'axios';
import {APP_URL} from '../../config';
import mapGlobalDispatchToProps from '../../redux/actions/globalAction';
let source = '';

const SearchInput = ({title, init_search_result}) => {
  useEffect(() => {
    source = axios.CancelToken.source();
    setSearch(title.keyword);

    // clearn up ==========================================
    return function () {
      // unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const [search, setSearch] = useState('');

  const onChange = val => {
    setSearch(val);
  };

  const submitSearch = () => {
    // navigation.navigate('search', {keyword: search});
    axios
      .post(
        `${APP_URL}/api/search`,
        {keyword: search},
        {
          cancelToken: source.token,
        },
      )
      .then(res => {
        init_search_result(res.data);
      })
      .catch(er => console.log(er));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 0,
      }}>
      <View
        style={{
          position: 'absolute',
          left: 5,
          zIndex: 1,
          borderTopLeftRadius: 7,
          borderBottomLeftRadius: 7,
          borderRightColor: colorStyle.gold2,
        }}>
        <MaterialCommunityIcons
          name="magnify"
          color={colorStyle.gold2}
          size={22}
        />
      </View>
      <TextInput
        style={{
          ...fromStyle.inputSearch,
          paddingLeft: 34,
          paddingRight: 15,
          borderRadius: 8,
          width: '70%',
          backgroundColor: colorStyle.black4,
          // height: 50,
        }}
        placeholderTextColor={colorStyle.white}
        underlineColorAndroid="transparent"
        placeholder="search here.."
        onChangeText={onChange}
        value={search}
        onSubmitEditing={submitSearch}
      />
    </View>
  );
};

export default connect(null, mapGlobalDispatchToProps)(SearchInput);
