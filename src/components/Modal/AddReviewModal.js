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
} from '.././../utils';
import {
  blackColor,
  redColor,
  whiteColor,
  blackOpacity5,
} from '../../constants/Color';
import {spacings, style} from '../../constants/Fonts';
import {BaseStyle} from '../../constants/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReviewForm from '../ReviewForm';
const {flex} = BaseStyle;

const AddReviewModal = ({visible, onClose}) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //     const fetchUserDetails = async () => {
  //         const userDetails = await AsyncStorage.getItem('userDetails')
  //         if (userDetails) {
  //             const userDetailsObject = JSON.parse(userDetails);
  //             // const userId = userDetailsObject.id;
  //             const userId = userDetailsObject.customer ? userDetailsObject.customer.id : userDetailsObject.id;
  //             setCustomerId(userId)
  //         }
  //     };
  //     fetchUserDetails();
  // }, []);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{position: 'absolute', top: 520, left: 182, borderRadius: 100}}>
        {/* <Text style={{alignSelf:"center", marginTop:2, color:whiteColor}}>X</Text> */}
        <AntDesign name="closecircle" size={20} color="black" />
      </View>
      <Pressable
        style={[styles.modalContainer, flex, {justifyContent: 'flex-end'}]}
        onPress={onClose}>
        <View style={[styles.modalContent, {backgroundColor: whiteColor}]}>
          <ReviewForm productId={'gid://shopify/Product/9431359553843'} />
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
    height: hp(35),
    borderRadius: 20,
  },
});

export default AddReviewModal;
