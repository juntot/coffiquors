import React from 'react';
import {Text, View, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorStyle} from '../../theme';

const PopUp = props => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          // Alert.alert("Modal has been closed.");
          // setModalVisible(!showModal);
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'relative',
              backgroundColor: 'white',
              width: '75%',
              minHeight: 220,
              borderRadius: 8,
              padding: 15,
            }}>
            {/* header */}
            <View
              style={{marginBottom: 25, display: 'flex', alignItems: 'center'}}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  top: -50,
                  padding: 2,
                  elevation: 0,
                  flex: 1,
                  borderWidth: 8,
                  backgroundColor: props.success
                    ? colorStyle.gold2
                    : colorStyle.gray,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {props.success ? (
                  <MaterialCommunityIcons
                    name="check"
                    color="white"
                    size={40}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="close"
                    color="white"
                    size={40}
                  />
                )}
              </View>
            </View>
            {/* body */}
            {props.children}
          </View>

          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ backgroundColor:'white', width: '80%', minHeight: 200, }}>
                  <Text>asdf</Text>
                </View>
                </View> */}
        </View>
      </Modal>
    </>
  );
};

export default PopUp;
