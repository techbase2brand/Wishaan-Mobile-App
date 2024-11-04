import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="ForgetPassword"
      component={ForgetPasswordScreen}
      options={{headerShown: false}}
    />
  
  </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})