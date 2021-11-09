/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import mapDispatchToProps from '../../redux/actions/cartAction';

import {layoutStyle, colorStyle, styles, modalStyles} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProdCart from './ProdCart';
import {APP_CURRENCY} from '../../config';

const ProdView = ({data, test, addCart}) => {
  const [showModal, setShowModal] = useState(false);
  const [subTotal, setSubTotal] = useState('');
  const [orientation] = useState(Dimensions.get('window').height - 80);

  const [qty, setQty] = useState(1);

  const minus = obj => {
    setQty(obj.qty);
    setSubTotal(data.price * obj.qty);
  };

  const plus = obj => {
    setQty(obj.qty);
    setSubTotal(data.price * obj.qty);
  };

  const addToCart = () => {
    let total = data.price * qty;
    // console.log({...data, qty: qty, total: total});
    addCart({...data, qty: qty, total: total});
  };

  const toggleModal = () => {
    if (setShowModal) {
      setSubTotal('');
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: 100,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: 100,
          }}>
          <View
            style={{
              width: 85,
              height: 85,
              borderRadius: 100,
              backgroundColor: 'white',
              position: 'absolute',
              elevation: 4,
              overflow: 'hidden',
              zIndex: 4,
            }}>
            <Image
              resizeMode="contain"
              style={{width: undefined, height: undefined, flex: 1}}
              // resizeMode="contain"
              source={{uri: data.imgUrl || null}}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingLeft: 60,
              width: '90%',
              right: '-35%',
              shadowOffset: {width: 10, height: 10},
              shadowColor: 'black',
              shadowOpacity: 0,
              elevation: 3,
              // background color must be set
              // backgroundColor : "#0000" // invisible color
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text
              style={{
                paddingTop: 8,
                paddingBottom: 2,
                color: colorStyle.gold2,
                fontWeight: 'bold',
              }}>
              {data.title} - {APP_CURRENCY}
              {data.price || 0}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                paddingTop: 4,
                paddingBottom: 8,
                paddingRight: 40,
                color: colorStyle.black4,
              }}>
              {data.descr || ''}
            </Text>

            <View style={{position: 'absolute', bottom: -10, right: -10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  padding: 4,
                  backgroundColor: colorStyle.gold2,
                  borderRadius: 50,
                  elevation: 99,
                  zIndex: 99,
                }}
                onPress={() => {
                  // Alert.alert( "Alert Title",
                  // "My Alert Msg",);
                  // test('yes its a test!!');
                  toggleModal();
                }}>
                <View>
                  <MaterialCommunityIcons name="plus" color="white" size={27} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          // Alert.alert("Modal has been closed.");
          // setModalVisible(!showModal);
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        />

        <View
          style={{
            display: 'flex',
            height: orientation,
            justifyContent: 'center',
          }}>
          <View style={modalStyles.modalView}>
            {/* product cart */}
            <View
              style={{
                ...styles.cardContainer,
                alignItems: 'center',
                borderBottomWidth: 0.5,
                paddingBottom: 22,
                borderColor: 'rgba(0,0,0, 0.3)',
              }}>
              <ProdCart data={data} minus={minus} plus={plus} />
            </View>
            {/* buttons */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 12,
              }}>
              <View>
                <Text style={{fontSize: 12, color: colorStyle.gray}}>
                  Sub Total:
                </Text>
                <Text style={{fontWeight: 'bold', color: colorStyle.gray}}>
                  {APP_CURRENCY}
                  {subTotal || data.price}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    padding: 10,
                    backgroundColor: colorStyle.gold2,
                    marginLeft: 10,
                    borderRadius: 4,
                    elevation: 8,
                  }}
                  onPress={() => {
                    toggleModal();
                  }}>
                  <Text style={{color: colorStyle.white}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    padding: 10,
                    backgroundColor: colorStyle.gold2,
                    marginLeft: 10,
                    borderRadius: 4,
                    elevation: 8,
                  }}
                  onPress={() => {
                    addToCart();
                    toggleModal();
                  }}>
                  <Text style={{color: colorStyle.white}}>Add Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default connect(null, mapDispatchToProps)(ProdView);
