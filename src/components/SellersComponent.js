import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { whiteColor } from '../constants/Color';

export default function SellersComponent({item, onPress}) {

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: item.thumb_url}} style={styles.thumbnail} />
      <Text style={styles.sellerName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  thumbnail: {
    width: 155,
    height: 167,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  sellerName: {
    position: 'absolute',
    bottom: 10,
    left:50,
    alignSelf:"center",
    width:"100%",
    fontSize:18,
    fontWeight:"500",
    color:whiteColor
    
  },
});
