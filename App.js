/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from './redux/reducers/rootReducer';

import Home from './screens/Home';
import CoffeeCategory from './screens/CoffeeCategory';
import HotCoffee from './screens/HotCoffee';
import Reservation from './screens/Reservation';
import Cart from './screens/Cart';
import ProductList from './screens/shared/ProductList';
import ProductDetail from './screens/shared/ProductDetail';

import {colorStyle} from './theme';
import Checkout from './screens/Checkout';
import Search from './screens/Search';
import SearchInput from './screens/shared/SearchInput';
import CustomHeader from './screens/shared/CustomHeader';
import ReservationHistroy from './screens/ReservationHistory';
import OrderHistroy from './screens/OrderHistory';

const Stack = createNativeStackNavigator();

const store = createStore(combineReducers);

const App = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   RNBootSplash.hide();
    // }, 1000);
    getData();
  }, []);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@uuid', value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@uuid');
      console.log(uuid.v4());
      if (value !== null) {
        return value;
      } else {
        storeData(uuid.v4());
      }
    } catch (e) {
      return false;
    }
  };
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" translucent={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerBackTitle: '',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colorStyle.black4,
            },
            cardStyle: {backgroundColor: colorStyle.black3},
          }}>
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="home"
            component={Home}
            // options={({route}) => ({title: route.params.title})}
          /> */}
          <Stack.Screen
            name="coffee category"
            component={CoffeeCategory}
            options={({route}) => ({title: route.params.title})}
          />
          <Stack.Screen
            name="ice coffee"
            component={HotCoffee}
            options={{
              headerShown: true,
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={({route}) => ({title: route.params.title})}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={({route}) => ({
              headerShown: false,
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
            options={({route}) => ({
              title: route.params.title,
              headerTitle: () => (
                <CustomHeader title={route.params.title} path="Order History" />
              ),
            })}
          />
          <Stack.Screen
            name="reservation"
            component={Reservation}
            options={({route}) => ({
              title: route.params.title,
              headerTitleContainerStyle: {
                left: 0,
              },
              headerTitle: () => (
                <CustomHeader
                  title={route.params.title}
                  path="Reservation History"
                />
              ),
            })}
          />
          <Stack.Screen
            name="checkout"
            component={Checkout}
            options={({route}) => ({title: route.params.title})}
          />
          <Stack.Screen
            name="search"
            component={Search}
            options={({route}) => ({
              headerTintColor: '#E1B025',
              headerTitleAlign: 'left',
              // headerStyle: {height: 90},
              headerTitle: () => <SearchInput title={route.params} />,
            })}
          />
          {/* HISTORY ================================================================= */}
          <Stack.Screen
            name="Reservation History"
            component={ReservationHistroy}
          />
          <Stack.Screen name="Order History" component={OrderHistroy} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
