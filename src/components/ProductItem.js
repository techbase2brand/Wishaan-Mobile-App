import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductItem = ({ item }) => {
  return (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginRight: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius:100,
  },
  productName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProductItem;
