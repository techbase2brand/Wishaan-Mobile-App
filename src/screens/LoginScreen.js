import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {APPLE_LOGO, GOOGLE_LOGO, LOGIN_IMG} from '../assets/Image';
import {blackColor, grayColor, redColor} from '../constants/Color';
import {BaseStyle} from '../constants/Style';
import {spacings} from '../constants/Fonts';

const {alignJustifyCenter, flexDirectionRow, textAlign} = BaseStyle;

const LoginScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      {/* <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity> */}

      {/* Logo */}
      <Image
        source={require('../assets/LoginLogo.png')} // Replace with your logo URL
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Illustration */}
      <Image
        source={LOGIN_IMG} // Replace with actual illustration URL
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Login Title */}
      <Text style={styles.title}>Login to your account!</Text>

      {/* Email Input with Label */}
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
          keyboardType="email-address"
        />
      </View>

      {/* Password Input with Label */}
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
          Password <Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPassword} onPress={()=>navigation.navigate("ForgetPassword")}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink}>Register</Text>
        </Text>
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
    top: 40,
    left: 20,
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
    // fontWeight: '500',
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
    marginBottom: 10,
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
    // justifyContent: 'space-between',
    width: 100,
  },
  appleIcon: {
    marginLeft: 20,
  },
});

export default LoginScreen;
