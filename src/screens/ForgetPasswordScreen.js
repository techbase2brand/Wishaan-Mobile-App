import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import {
  whiteColor,
  blackColor,
  grayColor,
  redColor,
  mediumGray,
} from '../constants/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPTextInput from 'react-native-otp-textinput';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SuccessModal from '../components/Modal/SuccessModal';
const {
  flex,
  alignItemsCenter,
  flexDirectionRow,
  alignJustifyCenter,
  positionAbsolute,
  borderWidth1,
} = BaseStyle;

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState('email');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (resendButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendButtonDisabled(false);
      setTimer(60); // Reset the timer back to 30 seconds or your desired interval
    }
    return () => clearInterval(interval);
  }, [resendButtonDisabled, timer]);

  const hadleResendOtp = async () => {
    if (resendButtonDisabled) return;
  };

  const handleOTPChange = otp => {
    setOtp(otp);
    setIsOtpComplete(otp.length === 6); // Assuming OTP length is 6
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailSubmit = async () => {
    // Validate email
    // if (!email) {
    //   setEmailError('Email is required');
    //   return;
    // }

    setCurrentStep('otp');
  };

  const handleOTPSubmit = () => {
    // if (otp.length !== 6) {
    //   console.log('Please enter a valid OTP');
    //   return;
    // }
    console.log('OTP verified successfully');
    setCurrentStep('password'); // Move to password reset section
    // setOtp('');
  };

  const handlePasswordSubmit = async () => {
    // Validate password
    // if (!password || !confirmPassword) {
    //   setPasswordError('Password and Confirm Password are required');
    //   return;

    // }
    // if (password !== confirmPassword) {
    //   setConfirmPasswordError('Passwords do not match');
    //   return;
    // }
    console.log('resetPassword');
    try {
      console.log({email, otp, password, confirmPassword});
      // Call backend API to reset password

      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={[flex]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, {backgroundColor: whiteColor}]}>
        <View
          style={[
            {width: '100%', height: hp(5)},
            flexDirectionRow,
            alignItemsCenter,
          ]}>
          <TouchableOpacity
            style={[styles.backIcon, alignItemsCenter]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name={'arrow-back'} size={33} color={blackColor} />
          </TouchableOpacity>
        </View>
        {currentStep === 'email' && (
          <View
            style={{width: '100%', height: hp(90), padding: spacings.large}}>
            <Text style={[styles.text, {color: blackColor}]}>
              Forgot password
            </Text>
            <Text
              style={[
                {
                  color: mediumGray,
                  paddingVertical: spacings.small,
                  marginBottom: 20,
                },
              ]}>
              Enter your email for the verification process.We will send 6
              digits code to your email.
            </Text>
        
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
                onChangeText={text => {
                  setEmail(text);
                  if (emailError) {
                    setEmailError('');
                  }
                }}
                value={email}
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <TouchableOpacity
              style={[styles.button, positionAbsolute, alignJustifyCenter]}
              onPress={handleEmailSubmit}>
              <Text style={[styles.buttonText, {color: whiteColor}]}>
                Send Code
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 'otp' && (
          <View
            style={{width: '100%', height: hp(90), padding: spacings.large}}>
            <Text style={[styles.text, {color: blackColor}]}>
              Enter 6 Digit Code
            </Text>
            <Text style={{color: mediumGray, paddingVertical: spacings.small}}>
              Enter 6 digit code that you received on your email
              <Text style={{color: blackColor}}> ({email}).</Text>
            </Text>
            <View style={[{width: '100%', height: hp(18)}, alignJustifyCenter]}>
              <OTPTextInput
                handleTextChange={handleOTPChange}
                inputCount={6}
                tintColor={blackColor}
                offTintColor={mediumGray}
                containerStyle={styles.otpContainer}
                textInputStyle={[styles.otpInput, {color: blackColor}]}
              />
             
            </View>
            <TouchableOpacity
              style={[styles.button, positionAbsolute, alignJustifyCenter]}
              onPress={handleOTPSubmit}>
              <Text style={[styles.buttonText, {color: whiteColor}]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 'password' && (
          <View
            style={{width: '100%', height: hp(90), padding: spacings.large}}>
            <Text style={[styles.text, {color: blackColor}]}>
              Reset password
            </Text>
            <Text
              style={[
                {mediumGray, paddingVertical: spacings.small, marginBottom: 20},
              ]}>
              Set the new password for your account so you can login and access
              all the features.
            </Text>
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

        
            <TouchableOpacity
              style={[
                styles.button,
                positionAbsolute,
                alignJustifyCenter,
                {top: hp(45)},
              ]}
              onPress={handlePasswordSubmit}>
              <Text style={[styles.buttonText, {color: whiteColor}]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {successModalVisible && (
          <SuccessModal
            visible={successModalVisible}
            onClose={() => setSuccessModalVisible(false)}
            headingText={'Password Changed!'}
            text={
              'Your can now use your new password to login to your account.'
            }
            onPressContinue={() => {
              setSuccessModalVisible(false), navigation.navigate('LoginScreen');
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacings.large,
  },
  backIcon: {
    width: wp(10),
    height: hp(5),
  },
  text: {
    fontSize: style.fontSizeLarge2x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
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
  button: {
    backgroundColor: redColor,
    padding: spacings.xLarge,
    borderRadius: 10,
    top: hp(35),
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightThin.fontWeight,
  },
  textInputHeading: {
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  otpContainer: {
    marginVertical: spacings.xLarge,
    width: '90%',
  },
  otpInput: {
    borderWidth: 1,
    fontSize: 20,
    color: blackColor,
    borderRadius: 5,
    width: '14%',
  },
  errorText: {
    color: redColor,
  },
});
