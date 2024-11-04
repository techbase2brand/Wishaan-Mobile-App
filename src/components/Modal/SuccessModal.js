import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '.././../utils';
import {
  blackColor,
  grayColor,
  redColor,
  whiteColor,
  blackOpacity5,
} from '../../constants/Color';
import {spacings, style} from '../../constants/Fonts';
import {BaseStyle} from '../../constants/Style';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SUCCESS_IMAGE} from '../../assets/Image';

const {textAlign, alignJustifyCenter, flex, borderRadius10, positionAbsolute} =
  BaseStyle;

const SuccessModal = ({
  visible,
  onClose,
  onPressContinue,
  headingText,
  text,
}) => {
  const navigation = useNavigation();
  const handleContinue = () => {
    onPressContinue();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={[styles.modalContainer, flex, alignJustifyCenter]}>
        <View
          style={[
            styles.modalContent,
            borderRadius10,
            alignJustifyCenter,
            {backgroundColor: whiteColor},
          ]}>
          <Image
            source={SUCCESS_IMAGE}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.message, textAlign, {color: blackColor}]}>
            {headingText ? headingText : 'Successfully'}
          </Text>
          <Text style={[styles.text, textAlign, {color: grayColor}]}>
            {text
              ? text
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </Text>
          <TouchableOpacity
            onPress={handleContinue}
            style={[styles.continueButton, alignJustifyCenter, borderRadius10]}>
            <Text style={[styles.buttonText, textAlign]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: blackOpacity5,
  },
  modalContent: {
    width: wp(80),
    padding: spacings.xxLarge,
    backgroundColor: whiteColor,
  },
  image: {
    width: wp(20),
    height: hp(12),
    marginVertical: spacings.large,
  },
  message: {
    fontSize: style.fontSizeLarge.fontSize,
    color: blackColor,
    marginTop: spacings.large,
  },
  text: {
    fontSize: style.fontSizeNormal.fontSize,
    color: grayColor,
  },
  closeButton: {
    top: spacings.small,
    right: spacings.small,
  },
  continueButton: {
    width: wp(60),
    height: hp(6),
    backgroundColor: redColor,
    marginTop: spacings.Large2x,
    justifyContent: 'center',
  },
  buttonText: {
    color: whiteColor,
    fontSize: style.fontSizeMedium.fontSize,
  },
});

export default SuccessModal;
