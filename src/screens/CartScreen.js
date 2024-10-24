import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import { whiteColor } from '../constants/Color';

// Mock data for cart items
const cartItems = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
  { id: '3', name: 'Product 3' },
];

export default function CartScreen({ navigation }) {
  const renderItem = ({ item }) => <CartItem item={item} />;

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <Header backIcon={true} text={"My Cart"} navigation={navigation} notification={true} />
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
