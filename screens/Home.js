import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';

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
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNav from './shared/BottomNav';
import ProdCategory from './shared/ProdCategory';
import ProdView from './shared/ProdView';
import {layoutStyle, colorStyle, styles} from '../theme';
import axios from 'axios';
import {APP_URL} from '../config';

const image = require('../assets/img/banner-coffe.jpg');

const Home = ({navigation, route}) => {
  const [search, setSearch] = useState('');
  const [orientation, setOrientation] = useState(
    // Dimensions.get('window').height - 54,
    Dimensions.get('window').height,
  );
  const [popular_list, setPopularList] = useState([]);

  useEffect(() => {
    // console.log('state: ', state);
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 0);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });

    let source = axios.CancelToken.source();
    console.log(`${APP_URL}/api/get-popular`);
    axios
      .get(`${APP_URL}/api/get-popular`, {
        cancelToken: source.token,
      })
      .then(res => {
        setPopularList(res.data);
        RNBootSplash.hide();
      })
      .catch(er => console.log('xxdfdff df', er));

    // clean up ====================================
    return function () {
      // unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const submitSearch = () => {
    navigation.navigate('search', {keyword: search});
  };

  const popList = () => {
    return popular_list.map(data => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('ProductDetail', {
              title: 'Product Details',
              data: {...data, imgUrl: APP_URL + '/storage/app/' + data.imgUrl},
            });
          }}
          key={data.id}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
            }}>
            <ProdView
              data={{...data, imgUrl: APP_URL + '/storage/app/' + data.imgUrl}}
            />
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      {/* <StatusBar backgroundColor={colorStyle.black3} /> */}
      <View
        style={{
          flex: 1,
          maxHeight: orientation,
          backgroundColor: colorStyle.black3,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={layoutStyle.root}>
            <View style={styles.banner}>
              <ImageBackground source={image} style={styles.banner_img}>
                <View style={styles.logo_container}>
                  <View style={styles.logo}>
                    {/* <Text style={{color: 'black', textAlign: 'center' }}>coffiquor</Text> */}
                    <Image
                      resizeMode="contain"
                      style={{width: undefined, height: undefined, flex: 1}}
                      resizeMode="contain"
                      source={{uri: APP_URL + '/public/img/home-icon.png'}}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={layoutStyle.body}>
              {/* card */}
              <View style={styles.cardContainer}>
                {/* ice coffe */}
                <ProdCategory
                  navigation={navigation}
                  navlink={'ProductList'}
                  route={'iced-coffe'}
                  title={'Cold drinks'}
                  imgUrl={APP_URL + '/public/img/cold-drinks-001-01.png'}
                />

                {/* hot coffee */}
                <ProdCategory
                  navigation={navigation}
                  navlink={'ProductList'}
                  route={'hot-coffee'}
                  title={'Hot drinks'}
                  imgUrl={APP_URL + '/public/img/hot-drinks-002-01.png'}
                />

                {/* more */}
                <ProdCategory
                  navigation={navigation}
                  navlink={'ProductList'}
                  route={'more'}
                  title={'More'}
                  imgUrl={APP_URL + '/public/img/more-00-01.png'}
                />
              </View>
              {/* search */}
              <View>
                <TextInput
                  onChangeText={val => setSearch(val)}
                  placeholder="search..."
                  style={styles.search}
                  onSubmitEditing={submitSearch}
                />
              </View>
              {/* popular */}
              <View>
                <Text style={styles.primaryText}>Popular</Text>
              </View>

              <View style={{paddingTop: 0}}>{popList()}</View>
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};

export default Home;
