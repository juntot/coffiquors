import React, {useEffect, useState} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import BottomNav from './BottomNav';
import {ScrollView} from 'react-native-gesture-handler';
import {layoutStyle, styles} from '../../theme';
import {APP_URL} from '../../config';

import ProdView from './ProdView';

// import Fetch from '../../Fetch'
import axios from 'axios';

const Productlist = ({route, navigation}) => {
  // console.log(route.params+'prod-list', route.params);

  const [prodList, setProdList] = useState([]);
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );

  useEffect(() => {
    dimensions();
    let source = axios.CancelToken.source();
    axios
      .get(`${APP_URL}/api/get-products/${route.params.route}`, {
        cancelToken: source.token,
      })
      .then(res => {
        setProdList(res.data);
      })
      .catch(error => console.log(error));
    // clearn up ==========================================
    return function () {
      // unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const dimensions = () => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 80);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });
  };

  const prod_list = () => {
    return prodList.map(data => {
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
            <View style={layoutStyle.container}>
              {prod_list()}
              {/* <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <ProdView data={{imgUrl:null, title:'title', descr:'', price:20}} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <ProdView data={{imgUrl:null, title:'title', descr:'', price:20}} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <ProdView data={{imgUrl:null, title:'title', descr:'', price:20}} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <ProdView data={{imgUrl:null, title:'title', descr:'', price:20}} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <ProdView data={{imgUrl:null, title:'title', descr:'', price:20}} />
                </TouchableOpacity> */}

              {/* <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                    style={{padding: 4,  borderRadius: 50, elevation: 3}}
                    onPress={()=>{
                    navigation.navigate('ProductDetail', {title: 'Product Details'});
                }}>
                    <View style={styles.cardContainer}>
                        <ProdView />
                    </View >
                </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
        <BottomNav navigation={navigation} />
      </View>
    </>
  );
};

export default Productlist;
