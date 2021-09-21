import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {layoutStyle, colorStyle, fromStyle, styles} from '../theme';
import BottomNav from './shared/BottomNav';
import ProdView from './shared/ProdView';
import {APP_URL} from '../config';
import {connect} from 'react-redux';
import mapGlobalDispatchToProps from '../redux/actions/globalAction';
import axios from 'axios';

const Search = ({navigation, route, state, init_search_result}) => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(
    () => {
      // console.log(state);
      let source = axios.CancelToken.source();
      // console.log(route.params)
      axios
        .post(
          `${APP_URL}/api/search`,
          {keyword: route.params.keyword},
          {
            cancelToken: source.token,
          },
        )
        .then(res => {
          init_search_result(res.data);
          //  console.log(searchresult)
        })
        .catch(er => console.log(er));

      // clearn up ==========================================
      return function () {
        // unmounted = true;
        source.cancel('Cancelling in cleanup');
      };
    },
    [
      // route.params.keyword
    ],
  );

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 80);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });
  }, []);

  const prod_list = () => {
    // return;
    return state.map(data => {
      //
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{padding: 4, borderRadius: 50, elevation: 3}}
          onPress={() => {
            navigation.navigate('ProductDetail', {
              title: 'Product Details',
              data: {...data, imgUrl: APP_URL + '/storage/app/' + data.imgUrl},
            });
          }}
          key={data.id}>
          <ProdView
            data={{...data, imgUrl: APP_URL + '/storage/app/' + data.imgUrl}}
          />
        </TouchableOpacity>
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
            <View style={layoutStyle.container}>{prod_list()}</View>
          </View>
        </ScrollView>
        <BottomNav navigation={navigation} />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    state: state.global,
  };
};

export default connect(mapStateToProps, mapGlobalDispatchToProps)(Search);
