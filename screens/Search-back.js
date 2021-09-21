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
import ProdView from './ProdView';
import {APP_URL} from '../config';

import axios from 'axios';
let source = axios.CancelToken.source();

const Search = ({navigation, route}) => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );
  const [keyword, setKeyword] = useState('');
  const [searchresult, setSearchResult] = useState([]);

  useEffect(() => {
    // axios.post(`${APP_URL}/api/search`,{keyword: route.params.keyword},{
    //   cancelToken: source.token,
    // })
    // .then(res=>{
    //   // console.log(res.data);
    //      setSearchResult(res.data);
    //      console.log(searchresult)
    // })
    // .catch(er=>console.log(er));
    // // clearn up ==========================================
    // return function () {
    //   // unmounted = true;
    //   source.cancel("Cancelling in cleanup");
    // };
  }, [route.params.keyword]);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 80);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });
  }, []);

  return (
    <>
      <View style={layoutStyle.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <View style={layoutStyle.container}>
              <Text>test</Text>
              {/* {prod_list()} */}

              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{padding: 4, borderRadius: 50, elevation: 3}}
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    title: 'Product Details',
                  });
                }}>
                <View style={styles.cardContainer}>
                  <ProdView />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <BottomNav navigation={navigation} />
      </View>
    </>
  );
};

export default Search;
