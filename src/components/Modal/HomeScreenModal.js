import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils';
import {
  blackColor,
  redColor,
  whiteColor,
  blackOpacity5,
  grayColor,
} from '../../constants/Color';
import {spacings, style} from '../../constants/Fonts';
import {BaseStyle} from '../../constants/Style';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
const {textAlign, alignJustifyCenter, flex, borderRadius10, positionAbsolute} =
  BaseStyle;

const HomeScreenModal = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <Pressable
        style={[styles.modalContainer, flex, {justifyContent: 'flex-end'}]}
        onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            alignJustifyCenter,
            {backgroundColor: whiteColor},
          ]}>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeButton, positionAbsolute]}>
            {/* <Ionicons name="close" size={28} color={blackColor} /> */}
          </TouchableOpacity>
          <View
            style={{
              width: '20%',
              height: '1%',
              backgroundColor: grayColor,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            {/* <FontAwesome name="minus" size={30} color={blackColor} /> */}
          </View>
          {/* <Text
            style={[
              styles.title,
              textAlign,
              {marginBottom: spacings.Large1x, color: blackColor},
            ]}>
            Add Address
          </Text> */}

          <ScrollView
            style={{width: '100%', height: hp(40), marginTop: 20}}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.submitButton, alignJustifyCenter, borderRadius10]}
              onPress={onClose}>
              <Ionicons
                // onPress={handlePress}
                name={'heart-dislike-outline'}
                size={30}
                color={'black'}
                style={styles.icon}
              />
              <Text style={[styles.title, textAlign, {color: grayColor}]}>
                Dislike this product
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: blackOpacity5,
  },
  modalContent: {
    width: wp(100),
    height: hp(40),
    paddingHorizontal: spacings.Large1x,
    // paddingVertical: spacings.large,
    backgroundColor: whiteColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: style.fontSizeLarge.fontSize,
    fontWeight: style.fontWeightThin.fontWeight,
    color: blackColor,
  },
  input: {
    height: hp(6),
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: spacings.large,
    paddingLeft: spacings.large,
    borderRadius: 5,
  },
  closeButton: {
    top: spacings.small,
    right: spacings.small,
  },
  submitButton: {
    width: wp(50),
    height: hp(5),
    // backgroundColor: redColor,
    marginTop: spacings.Large1x,
    alignSelf: 'center',
  },
});

export default HomeScreenModal;
