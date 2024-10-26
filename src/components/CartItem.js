import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {blackColor, redColor, whiteColor} from '../constants/Color';
import {BaseStyle} from '../constants/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {spacings, style} from '../constants/Fonts';

const {
  borderRadius5,
  alignJustifyCenter,
  flexDirectionRow,
  flex,
  alignItemsFlexEnd,
  resizeModeCover,
  borderWidth1,
} = BaseStyle;

const CartItem = ({item}) => {
  return (
    <View
      // key={}
      style={[
        styles.productItem,
        {
          borderWidth: 1,
          borderColor: '#E6E6E6',
          backgroundColor: whiteColor,
        },
      ]}>
      <Image
        resizeMethod="resize"
        style={[styles.productImage, resizeModeCover, borderRadius5]}
        // alt={item?.merchandise?.image?.altText}
        // source={{ uri: item?.merchandise?.image?.url }}
        source={require('../assets/vipPoster.png')}
      />
      <View
        style={[
          styles.productText,
          flex,
          alignJustifyCenter,
          flexDirectionRow,
        ]}>
        <View style={[flex]}>
          <Text style={[styles.productTitle, {color: blackColor}]}>
            {item?.name}
          </Text>
          <Text
            style={[
              styles.productTitle,
              {color: '#808080', fontSize: 12, marginBottom: 20},
            ]}>
            Color : Black
          </Text>
          <Text style={[styles.productPrice, {color: blackColor}]}>$ 1290</Text>
        </View>
        <View>
          <Pressable style={[styles.removeButton, alignItemsFlexEnd]}>
            {/* {loading ? (
                            <ActivityIndicator size="small" />
                        ) : ( */}
            <AntDesign name={'delete'} size={18} color={redColor} />
            {/* )} */}
          </Pressable>
          <Text style={[styles.productDescription, {color: blackColor}]}></Text>
          <View
            style={[
              styles.quantityContainer,
              ,
              {backgroundColor: whiteColor, borderColor: blackColor},
            ]}>
            <TouchableOpacity onPress={() => console.log('decriment')}>
              <Text
                style={[
                  styles.quantityButton,
                  borderWidth1,
                  {color: blackColor, borderColor: '#E6E6E6'},
                ]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={[styles.quantity, {color: blackColor}]}>1</Text>
            <TouchableOpacity onPress={() => console.log('incriment')}>
              <Text
                style={[
                  styles.quantityButton,
                  borderWidth1,
                  {color: blackColor, borderColor: '#E6E6E6'},
                ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  productItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacings.large,
    padding: spacings.large,
    backgroundColor: whiteColor,
    borderRadius: 5,
  },
  productItemLoading: {
    opacity: 0.6,
  },
  productText: {
    paddingLeft: 10,
    display: 'flex',
    // color: textSubdued
  },
  productTitle: {
    fontSize: style.fontSizeNormal1x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    lineHeight: 20,
    color: blackColor,
  },
  productDescription: {
    fontSize: style.fontSizeNormal.fontSize,
    // color: colors.textSubdued,
    // padding: spacings.xLarge
  },
  productPrice: {
    fontSize: style.fontSizeNormal.fontSize,
    // padding: spacings.xLarge,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  removeButton: {
    marginBottom: spacings.xsmall,
    paddingBottom: spacings.large,
  },

  productImage: {
    width: wp(20),
    height: hp(10),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(22),
    backgroundColor: whiteColor,
    paddingHorizontal: 9,
    paddingVertical: 2,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: redColor,
  },
  quantityButton: {
    paddingHorizontal: 8,
    // paddingVertical: 5,
    borderRadius: 5,
    color: redColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    fontSize: 16,
    // fontWeight: 'bold',
    color: redColor,
  },
});
export default CartItem;
