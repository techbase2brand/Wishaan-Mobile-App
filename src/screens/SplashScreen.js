import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Dimensions } from 'react-native';
import { MAIN_ICON, SPLASH_IMAGE } from '../assets/Image';

const {width, height} = Dimensions.get('window');
const SplashScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Image
        source={SPLASH_IMAGE}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
