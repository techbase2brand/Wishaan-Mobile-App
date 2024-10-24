/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
// import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { fetchVideosRequest, fetchVideosSuccess } from './src/redux/actions/videoActions';
import { useDispatch } from 'react-redux';
import { Videos } from './src/constants/Constants';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideosRequest());
    dispatch(fetchVideosSuccess(Videos));
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
