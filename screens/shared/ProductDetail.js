/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BottomNav from './BottomNav';
import {ScrollView} from 'react-native-gesture-handler';
import {colorStyle, layoutStyle, styles} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import mapDispatchToProps from '../../redux/actions/cartAction';
import {APP_CURRENCY, APP_CURRENCY_WHITE} from '../../config';

const ProductDetail = ({route, navigation, state, addCart}) => {
  const [showModal, setShowModal] = useState(false);
  const [subTotal, setSubTotal] = useState('');
  const [qty, setQty] = useState(1);

  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height,
  );
  const [data, setData] = useState({});
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height);
      } else {
        setOrientation(Dimensions.get('window').height);
      }
    });
  });

  useEffect(() => {
    // console.log(route.params.data);
    setData(route.params.data);
  }, [route]);

  const minus = () => {
    if (qty > 1) {
      setQty(qty => {
        qty = qty - 1;
        setSubTotal(data.price * qty);
        return qty;
      });
      // setSubTotal(data.price * qty);
    }
  };

  const plus = () => {
    setQty(qty => {
      qty = qty + 1;
      setSubTotal(data.price * qty);
      return qty;
    });
  };

  const addToCart = () => {
    let total = data.price * qty;
    addCart({...data, qty: qty, total: total});
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colorStyle.black3}}>
        {/* <Text style={{color: 'white'}}>Page content</Text> */}

        <View
          style={{
            flex: 1,
            maxHeight: orientation,
            backgroundColor: colorStyle.black3,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{...layoutStyle.root}}>
              <View style={{flex: 1}}>
                <View style={{position: 'absolute', zIndex: 9, marginTop: 20}}>
                  {/* <MaterialCommunityIcons name="plus" color="white" /> */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0)',
                      borderRadius: 50,
                      elevation: 0,
                      left: 15,
                      top: 25,
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <View>
                      <MaterialCommunityIcons
                        name="arrow-left-circle"
                        color={colorStyle.gold2}
                        size={34}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                    right: 0,
                    marginTop: 20,
                  }}>
                  {/* <MaterialCommunityIcons name="plus" color="white" /> */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      padding: 15,
                      position: 'relative',
                      right: 15,
                      top: 16,
                    }}
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
                    ) : // eslint-disable-next-line prettier/prettier
                    null
                    }
                    <MaterialCommunityIcons
                      name="cart-outline"
                      color={colorStyle.gold2}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: orientation * 0.65,
                    backgroundColor: 'white',
                  }}>
                  <Image
                    style={{width: undefined, height: undefined, flex: 1}}
                    resizeMode="cover"
                    source={{uri: data.imgUrl || null}}
                  />
                </View>
                <View style={{position: 'relative', top: -60}}>
                  <View style={{display: 'flex', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: '85%',
                        flexWrap: 'wrap',
                        borderRadius: 8,
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        minHeight: '65%',
                        padding: 15,
                        // minHeight: 200
                        flex: 1,
                      }}>
                      <View>
                        <Text style={styles.title}>
                          {data.title + ' - '}
                          {APP_CURRENCY}
                          {data.price || ''}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={minus}>
                          <MaterialCommunityIcons
                            name="minus"
                            color={colorStyle.gray}
                            size={22}
                          />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 8, marginRight: 8}}>
                          {qty}
                        </Text>
                        <TouchableOpacity onPress={plus}>
                          <MaterialCommunityIcons
                            name="plus"
                            color={colorStyle.gray}
                            size={22}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: '100%',
                        }}>
                        <Text style={styles.text_desc}>{data.descr || ''}</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <View style={{width: '100%'}}>
                          {/* <Button
                            onPress={addToCart}
                            title={`Add To Cart - $${
                              subTotal ? subTotal : data.price
                            }`}
                            color={colorStyle.gold2}
                            // accessibilityLabel="Learn more about this purple button"
                          /> */}
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                              padding: 10,
                              backgroundColor: colorStyle.gold2,
                              // marginLeft: 10,
                              borderRadius: 4,
                              elevation: 8,
                            }}
                            onPress={addToCart}>
                            <Text style={{color: colorStyle.white}}>
                              {'Add To Cart - '}
                              {(APP_CURRENCY, APP_CURRENCY_WHITE)}
                              {subTotal ? subTotal : data.price}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
