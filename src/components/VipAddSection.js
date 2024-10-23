import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { whiteColor } from '../constants/Color';
import { VIP_POSTER } from '../assests/images';

export default function VipAddSection({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
      {/* <Text style={styles.sellerName}>{item.name}</Text> */}
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
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  sellerName: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    alignSelf: "center",
    width: "100%",
    fontSize: 18,
    fontWeight: "500",
    color: whiteColor

  },
});

