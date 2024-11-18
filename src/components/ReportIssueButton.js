import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {redColor} from '../constants/Color';
import Entypo from 'react-native-vector-icons/Entypo';
const ReportIssueButton = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{}}
        onPress={() => navigation.navigate('ConfirmReportIssues')}>
        {/* <Image
          source={require('../assets/AccountScreen/about.png')}
          style={{width:30, height: 30,alignSelf:"center",}}
        /> */}
        <Entypo name="info-with-circle" size={60} color={redColor} />
      </TouchableOpacity>
    </View>
  );
};

export default ReportIssueButton;

const styles = StyleSheet.create({});
