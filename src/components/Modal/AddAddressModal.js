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
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const {textAlign, alignJustifyCenter, flex, borderRadius10, positionAbsolute} =
  BaseStyle;

const AddAddressModal = ({visible, onClose}) => {
  const navigation = useNavigation();
  const [customerId, setCustomerId] = useState(Number);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [provinceCode, setProvinceCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [address1Error, setAddress1Error] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [zipError, setZipError] = useState(false);

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !address1 ||
      !country ||
      !state ||
      !city ||
      !phone ||
      !zip
    ) {
      Toast.show('All fields marked with * are required');
      setFirstNameError(!firstName);
      setLastNameError(!lastName);
      setAddress1Error(!address1);
      setCountryError(!country);
      setStateError(!state);
      setCityError(!city);
      setCompanyError(!company);
      setPhoneError(!phone);
      setZipError(!zip);
      return;
    }
  };

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
            <Ionicons name="close" size={28} color={blackColor} />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              textAlign,
              {marginBottom: spacings.Large1x, color: blackColor},
            ]}>
            Add Address
          </Text>
          <ScrollView
            style={{width: '100%', height: hp(40)}}
            showsVerticalScrollIndicator={false}>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: firstNameError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="First Name*"
              placeholderTextColor={firstNameError ? redColor : blackColor}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setFirstNameError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: lastNameError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Last Name*"
              placeholderTextColor={lastNameError ? redColor : blackColor}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setLastNameError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: address1Error ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Address 1*"
              placeholderTextColor={address1Error ? redColor : blackColor}
              value={address1}
              onChangeText={text => {
                setAddress1(text);
                setAddress1Error(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {borderBottomColor: blackColor, color: blackColor},
              ]}
              placeholder="Address 2"
              placeholderTextColor={blackColor}
              value={address2}
              onChangeText={setAddress2}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: countryError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Country*"
              placeholderTextColor={countryError ? redColor : blackColor}
              value={country}
              onChangeText={text => {
                setCountry(text);
                setCountryError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: stateError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="State*"
              placeholderTextColor={stateError ? redColor : blackColor}
              value={state}
              onChangeText={text => {
                setState(text);
                setStateError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: cityError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="City*"
              placeholderTextColor={cityError ? redColor : blackColor}
              value={city}
              onChangeText={text => {
                setCity(text);
                setCityError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: companyError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Company*"
              placeholderTextColor={companyError ? redColor : blackColor}
              value={company}
              onChangeText={text => {
                setCompany(text);
                setCompanyError(!text);
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: phoneError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Phone*"
              placeholderTextColor={phoneError ? redColor : blackColor}
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setPhoneError(!text);
              }}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: zipError ? redColor : blackColor,
                  color: blackColor,
                },
              ]}
              placeholder="Zip Code*"
              placeholderTextColor={zipError ? redColor : blackColor}
              value={zip}
              onChangeText={text => {
                setZip(text);
                setZipError(!text);
              }}
              keyboardType="number-pad"
              maxLength={6}
            />
            {/* <TouchableOpacity onPress={handleSubmit} style={[styles.submitButton, alignJustifyCenter, borderRadius10]}>
              <Text style={[styles.title, textAlign, { color: whiteColor }]}>Submit</Text>
            </TouchableOpacity> */}
          </ScrollView>
          <Pressable
            onPress={handleSubmit}
            style={[styles.submitButton, alignJustifyCenter, borderRadius10]}>
            <Text style={[styles.title, textAlign, {color: whiteColor}]}>
              Submit
            </Text>
          </Pressable>
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
    height: hp(80),
    paddingHorizontal: spacings.Large1x,
    paddingVertical: spacings.large,
    backgroundColor: whiteColor,
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
    backgroundColor: redColor,
    marginTop: spacings.Large1x,
    alignSelf: 'center',
  },
});

export default AddAddressModal;
