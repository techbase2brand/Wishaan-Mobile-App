import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import {redColor, whiteColor} from '../constants/Color';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';

// Mock data for cart items
const cartItems = [
  {id: '1', name: 'Product 1'},
  {id: '2', name: 'Product 2'},
  {id: '3', name: 'Product 3'},
];

const {borderRadius10, textAlign} = BaseStyle;

export default function CartScreen({navigation}) {
  const renderItem = ({item}) => <CartItem item={item} />;

  return (
    <View style={{flex: 1, backgroundColor: whiteColor}}>
      <Header
        backIcon={true}
        text={'My Cart'}
        navigation={navigation}
        notification={true}
      />
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          contentContainerStyle={{paddingVertical: 10}}
        />
      </View>
      <View style={styles.addToCartButtonContainer}>
        {/* <Pressable 
            // disabled={loading || !variantSelected}
            style={[
              styles.addToCartButton,
              borderRadius10,
              {
                width: wp(45),
                marginRight: 20,
                backgroundColor: '#fff',
                borderColor: redColor,
                borderWidth: 1,
              },
            ]}
            //   onPress={() => onAddToCart(product.variants[0].variantId, quantity)}
          >
            {loading ? (
              <View style={[styles.addToCartButtonLoading, textAlign]}>
                <ActivityIndicator size="small" color={redColor} />
              </View>
            ) : (
              <Text
                style={[
                  styles.addToCartButtonLoading,
                  textAlign,
                  {color: redColor},
                ]}>
                Add to cart
              </Text>
            )}
          </Pressable> */}
        <Pressable
          // disabled={loading || !variantSelected}
          style={[styles.addToCartButton, borderRadius10, {width: wp(45)}]}
          // onPress={() => variant?.id && onAddToCart(variant.id, quantity)}
        >
          {/* {loading ? (
              <View style={[styles.addToCartButtonLoading, textAlign]}>
                <ActivityIndicator size="small" color={whiteColor} />
              </View>
            ) : ( */}
          <Text
            style={[
              styles.addToCartButtonLoading,
              textAlign,
              {color: whiteColor},
            ]}>
            Buy Now
          </Text>
          {/* )} */}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  addToCartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
  },
  addToCartButton: {
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    backgroundColor: redColor,
    padding: spacings.xxLarge,
  },
  outOfStockButton: {
    width: wp(60),
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    backgroundColor: redColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    fontSize: style.fontSizeNormal.fontSize,
    lineHeight: 20,
    color: whiteColor,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
});
