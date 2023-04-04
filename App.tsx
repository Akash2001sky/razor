/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'; //import SplashScreen

import RazorpayCheckout from 'react-native-razorpay';
import Login from './components/Login';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './components/Cart';
import { Provider } from './components/Provider';
import WishList from './components/WishList';
const Stack = createStackNavigator();

class App extends React.Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }
  render(): React.ReactNode {
    return (
      <Provider>
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='Products' component={Products} options={{headerShown:false}}/>
      <Stack.Screen name='SingleProduct' component={SingleProduct}/>
      <Stack.Screen name='Cart' component={Cart}/>
      <Stack.Screen name='WishList' component={WishList}/>
    </Stack.Navigator>
   </NavigationContainer>
   </Provider>
    );
  }
}
export default App;

