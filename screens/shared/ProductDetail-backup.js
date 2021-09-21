import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import BottomNav from './BottomNav';
import {ScrollView} from 'react-native-gesture-handler';
import {colorStyle, layoutStyle, styles} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetail = ({route, navigation}) => {
  console.log(route.params);
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').height - 80,
  );

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(Dimensions.get('window').height - 80);
      } else {
        setOrientation(Dimensions.get('window').height - 80);
      }
    });
  });

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colorStyle.black3,
        }}>
        {/* <View style={{height: 800, backgroundColor: 'skyblue', width: '10%', }}>
                <Text>sdf</Text>
            </View>
            <View style={{height: 800, backgroundColor: 'blue', width: '100%', }}>
                <Text>sdf</Text>
            </View> */}
        <View style={{position: 'absolute', zIndex: 9}}>
          <MaterialCommunityIcons name="plus" color="white" />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              elevation: 0,
              left: 15,
              top: 5,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <View>
              <MaterialCommunityIcons
                name="arrow-left-circle"
                color={colorStyle.gold2}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', zIndex: 9, right: 0}}>
          <MaterialCommunityIcons name="plus" color="white" />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              elevation: 0,
              right: 15,
              top: 5,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <View>
              <MaterialCommunityIcons
                name="cart-outline"
                color={colorStyle.gold2}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, borderWidth: 0, borderColor: 'red'}}>
          <View
            style={{width: '100%', height: '65%', backgroundColor: 'white'}}>
            <Image
              resizeMode="contain"
              style={{width: undefined, height: undefined, flex: 1}}
              resizeMode="contain"
              source={require('../../assets/img/coffee-01.png')}
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
                }}>
                <View>
                  <Text style={styles.title}>title</Text>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  <Text style={styles.text_desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid, consequuntur. Culpa vel et neque beatae alias natus
                    quos laboriosam, est aliquid atque aut odit. Amet minus
                    animi perspiciatis explicabo aspernatur. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Sed culpa facere
                    provident, architecto vel cupiditate voluptas quo repellat
                    quam. Deleniti porro rem id impedit maxime corrupti est
                    fugit, doloribus voluptates.
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <View style={{width: '100%'}}>
                    <Button
                      onPress={() => {}}
                      title="Add To Cart"
                      color={colorStyle.gold2}
                      // accessibilityLabel="Learn more about this purple button"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <View style={{...layoutStyle.root}}>
            <ScrollView
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            >
                <View style={{flex: 1, height: orientation + 80}}>
                    <View style={{ flex: 1, borderWidth: 1, borderColor: 'white'}}>

                            <View style={{width: '100%', height: '80%', backgroundColor: 'white'}}>
                                <Image
                                resizeMode='contain'
                                style={{width: undefined, height: undefined, flex: 1}}
                                resizeMode="contain"
                                source={require('../../assets/img/coffee-01.png')}
                                />
                            </View>
                            <View style={{position: 'relative', top: -30, }}>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <View style={{backgroundColor: 'white', width: '70%', flexWrap: 'wrap',
                                        borderRadius: 8,
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,
                                        elevation: 6,
                                        // height: '100%'
                                        // minHeight: 100
                                    }}>
                                        <Text style={{color: 'red'}}>ice coffee</Text>
                                    </View>
                                </View>
                            </View>
                    </View>
                </View>
            </ScrollView>
        </View> */}
    </>
  );
};

export default ProductDetail;
