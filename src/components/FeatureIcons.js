import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';

const features = [
  {
    id: '1',
    title: '10 Million+',
    title1: 'Happy Customer',
    icon: require('../assets/Customer_satisfied.png'),
  },
  {
    id: '2',
    title: 'Genuine',
    title1: 'Product',
    icon: require('../assets/quality.png'),
  },
  {
    id: '3',
    title: 'Quality',
    title1: 'Checked',
    icon: require('../assets/safety.png'),
  },
];

const FeatureIcons = () => {
  const renderItem = ({item}) => (
    <View style={styles.container}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={[styles.text, {marginTop: 4}]}>{item.title1}</Text>
    </View>
  );

  return (
    <FlatList
      data={features}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      //   contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(30),
    // padding: 16,
    backgroundColor: '#fff',
    margin: 5,
    marginVertical: 16,
  },
  feature: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeatureIcons;
