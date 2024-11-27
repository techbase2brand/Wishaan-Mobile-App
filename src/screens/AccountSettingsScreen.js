import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {redColor} from '../constants/Color';
import Header from '../components/Header';

const AccountSettingsScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Header
        backIcon={true}
        navigation={navigation}
        marginleft={30}
        text={'Account settings'}
      />
      {/* <Text style={styles.header}>Account settings</Text> */}

      {/* Settings Options */}
      {/* <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Delete account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity> */}

      {/* edit profile  */}

      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={[styles.section]}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <View style={{}}>
          <Text style={styles.sectionText}>Edit Profile</Text>
          <Text style={{marginLeft: 16, marginTop: 4}}>
            Change your Name, Email and Profile Photo
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={[styles.section]}
        onPress={() => navigation.navigate('DeleteAccount')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>Delete account</Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>Change Password</Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      {/* Ads Section */}
      <Text style={styles.adsTitle}>Ads</Text>
      <View style={styles.adContainer}>
        <Image
          source={require('../assets/vipPoster.png')}
          style={styles.adImage}
        />
        {/* <Text style={styles.awardedByText}>
          Awarded by Sonu Sood (Bollywood Actor)
        </Text>
        <Text style={styles.adTitle}>INTERNATIONAL BUSINESS AWARD</Text>
        <Text style={styles.adWinner}>Winner 2023 - 24</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: redColor,
    marginLeft: 24,
    marginTop: 100,
  },
  adContainer: {
    marginHorizontal: 24,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    padding: 8,
  },
  adImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  awardedByText: {
    fontSize: 12,
    color: 'grey',
    marginVertical: 4,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: redColor,
    textAlign: 'center',
  },
  adWinner: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionDivider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#eee',
  },
});

export default AccountSettingsScreen;
