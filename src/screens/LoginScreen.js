import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {blackColor, grayColor, redColor} from '../constants/Color';
import {APPLE_LOGO, GOOGLE_LOGO, LOGIN_IMG} from '../assets/Image';
import {widthPercentageToDP as wp} from '../utils';
import {BaseStyle} from '../constants/Style';
import {spacings} from '../constants/Fonts';

const {
  alignJustifyCenter,
  flexDirectionRow,
  textAlign,
  positionAbsolute,
  textDecorationUnderline,
} = BaseStyle;

const LoginScreen = () => {
  const [selectedTab, setSelectedTab] = useState('otp'); // State to manage selected tab
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
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

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'otp' && styles.activeTab,
            {
              borderTopLeftRadius: selectedTab === 'otp' ? 8 : 8,
              borderBottomLeftRadius: selectedTab === 'otp' ? 8 : 8,
            },
          ]}
          onPress={() => setSelectedTab('otp')}>
          <Text
            style={[
              styles.tabText,
              {color: selectedTab === 'otp' ? '#ffff' : blackColor},
            ]}>
            Login with OTP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'password' && styles.activeTab,
            ,
            {
              borderTopRightRadius: selectedTab === 'password' ? 8 : 8,
              borderBottomRightRadius: selectedTab === 'password' ? 8 : 8,
            },
          ]}
          onPress={() => setSelectedTab('password')}>
          <Text
            style={[
              styles.tabText,
              {color: selectedTab === 'password' ? '#ffff' : blackColor},
            ]}>
            Login with Password
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering based on Selected Tab */}
      {selectedTab === 'otp' ? (
        // Login with OTP section
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Mobile Number*"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={styles.otpButton}>
            <Text style={styles.buttonText}>Send OTP / Resend OTP</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP*"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={[styles.buttonText, {color: '#ffff', fontSize: 16}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, {marginBottom: 20}]}
            placeholder="Email / Mobile Number*"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password*"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={[styles.buttonText, {color: '#ffff', fontSize: 16}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Social Login */}
      <View style={styles.socialLoginContainer}>
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
        </View>
      </View>
      <View
        style={[
          positionAbsolute,
          alignJustifyCenter,
          {bottom: 10, width: '100%'},
        ]}>
        <Text style={[{color: blackColor}, textAlign]}>
          By continuing you agree to our{' '}
        </Text>
        <View
          style={[
            flexDirectionRow,
            {marginTop: 4, width: '100%'},
            alignJustifyCenter,
          ]}>
          <TouchableOpacity>
            <Text style={[{color: redColor}, textDecorationUnderline]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                {color: redColor, marginLeft: 4},
                textDecorationUnderline,
              ]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[{color: redColor}, textDecorationUnderline]}>
              {' '}
              Content Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
  },
  illustration: {
    width: 250,
    height: 180,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  tabContainer: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  activeTab: {
    backgroundColor: redColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 10,
    width: wp(80),
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  otpButton: {
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'flex-end',
    color: redColor,
  },
  submitButton: {
    backgroundColor: redColor,
    paddingVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonText: {
    color: redColor,
    fontSize: 14,
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
    width: 100,
  },
  appleIcon: {
    marginLeft: 20,
  },
});

export default LoginScreen;
