import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {APPLE_LOGO, GOOGLE_LOGO, LOGIN_IMG} from '../assets/Image';
import {blackColor, grayColor, redColor} from '../constants/Color';
import {BaseStyle} from '../constants/Style';
import {spacings} from '../constants/Fonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';

const {
  alignJustifyCenter,
  flexDirectionRow,
  textAlign,
  alignItemsCenter,
  borderRadius5,
  borderWidth1,
} = BaseStyle;

const RegisterScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="black" />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {color: redColor, marginBottom: 8, marginTop: 20},
        ]}>
        Welcome!
      </Text>

      {/* Login Title */}
      <Text style={[styles.title, {marginBottom: 60}]}>
        Create your new account
      </Text>

      {/* Email Input with Label */}
      <View style={styles.inputContainer}>
        <Text
          style={[
            styles.inputLabel,
            {
              width: '28%',
              backgroundColor: '#fff',
              marginLeft: 10,
              marginBottom: -10,
              zIndex: 99999,
              textAlign: 'center',
            },
          ]}>
          Full Name <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input with Label */}
      <View style={styles.inputContainer}>
        <Text
          style={[
            styles.inputLabel,
            {
              width: '20%',
              backgroundColor: '#fff',
              marginLeft: 10,
              marginBottom: -10,
              zIndex: 99999,
              textAlign: 'center',
            },
          ]}>
          Email <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your Email"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <Text
          style={[
            styles.inputLabel,
            {
              width: '28%',
              backgroundColor: '#fff',
              marginLeft: 10,
              marginBottom: -10,
              zIndex: 99999,
              textAlign: 'center',
            },
          ]}>
          Password <Text style={styles.asterisk}>*</Text>
        </Text>
        <View
          style={[
            styles.input,
            borderWidth1,
            flexDirectionRow,
            alignItemsCenter,
            // {borderColor: grayColor},
          ]}>
          <View style={{flex: 1}}>
            <TextInput
              placeholder={'Password'}
              placeholderTextColor={grayColor}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              style={{color: blackColor}}
            />
          </View>
          <TouchableOpacity onPress={toggleShowPassword}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={grayColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.inputContainer]}>
        <Text
          style={[
            styles.inputLabel,
            {
              width: '45%',
              backgroundColor: '#fff',
              marginLeft: 10,
              marginBottom: -10,
              zIndex: 99999,
              textAlign: 'center',
            },
          ]}>
          Confirm Password <Text style={styles.asterisk}>*</Text>
        </Text>
        <View
          style={[
            styles.input,
            borderWidth1,
            flexDirectionRow,
            alignItemsCenter,
          ]}>
          <View style={{flex: 1}}>
            <TextInput
              placeholder={'Confirm Password'}
              placeholderTextColor={grayColor}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              style={{color: blackColor}}
            />
          </View>
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <MaterialCommunityIcons
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={20}
              color={grayColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <View style={styles.socialLoginContainer}>
        {/* <Text style={styles.orText}>or</Text> */}
        <View style={[flexDirectionRow, alignJustifyCenter, {width: '100%'}]}>
          <View
            style={{
              height: 1,
              backgroundColor: grayColor,
              width: '46%',
            }}></View>
          <Text
            style={[
              {
                color: blackColor,
                marginVertical: spacings.xxxxLarge,
                marginHorizontal: spacings.small,
              },
              textAlign,
            ]}>
            {'Or'}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: grayColor,
              width: '46%',
            }}></View>
        </View>
        <View style={styles.socialIcons}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 200,
              borderWidth: 1,
              borderColor: '#ddd',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={GOOGLE_LOGO}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>

          {Platform.OS === 'ios' && (
            <View
              style={{
                marginLeft: 20,
                width: 40,
                height: 40,
                borderRadius: 200,
                borderWidth: 1,
                borderColor: '#ddd',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={APPLE_LOGO}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'cover',
                }}
              />
            </View>
          )}
          {/* <Icon name="google" size={40} color="black" />
          <Icon name="apple" size={40} color="black" style={styles.appleIcon} /> */}
        </View>
      </View>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.registerText}>
          Already have an account?{' '}
          <Text style={styles.registerLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  logo: {
    width: 120,
    // height: 50,
    // marginTop: 60,
  },
  illustration: {
    width: 250,
    height: 180,
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    // fontWeight: '00',
    color: '#333',
    marginBottom: 5,
  },
  asterisk: {
    color: redColor,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: redColor,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: redColor,
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  halfInput: {
    width: '100%',
    height: hp(5.5),
    // borderColor: grayColor,
    paddingHorizontal: spacings.large,
    marginVertical: spacings.medium,
    // marginRight: spacings.large,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    marginVertical: 10,
  },
  registerLink: {
    color: redColor,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  appleIcon: {
    marginLeft: 20,
  },
});

export default RegisterScreen;
