import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import {redColor} from '../constants/Color';
import ReportIssueButton from '../components/ReportIssueButton';

export default function AccountScreen({navigation}) {
  return (
    <View styles={{flex:1}}>
      <View style={{position: 'absolute', bottom: 100, right: 20, zIndex: 10}}>
        <ReportIssueButton navigation={navigation} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header
          backIcon={true}
          navigation={navigation}
          notification={true}
          text={'Account'}
          marginleft={6}
        />
        {/* {/ User Profile /} */}
        <View style={{paddingHorizontal: 16}}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/profileimg.png')} // Replace with your image
              // source={require('../assests/notificationimage.png')}
              style={styles.profileImage}
            />
            <View style={[styles.profileInfo, {flexDirection: 'row', gap: 10}]}>
              <Text style={styles.profileName}>{'Aman Kumar'}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <Feather name="edit" size={20} color="black" />
              </TouchableOpacity>

              {/* <TouchableOpacity>
              <Text style={styles.viewActivity}>View activity</Text>
            </TouchableOpacity> */}
            </View>
          </View>

          {/* {/ Shortcuts /} */}
          <View style={styles.shortcutContainer}>
            <TouchableOpacity
              style={styles.shortcut}
              onPress={() => navigation.navigate('Saved')}>
              <View
                style={{
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#E6E6E6',
                  borderRadius: 100,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingTop: 7,
                }}>
                <AntDesign name="hearto" size={20} color="black" />
              </View>
              <Text style={styles.shortcutText}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortcut}
              onPress={() => navigation.navigate('Cart')}>
              <View
                style={{
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#E6E6E6',
                  borderRadius: 100,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingTop: 6,
                }}>
                <Image
                  source={require('../assets/AccountScreen/profileCart.png')}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              </View>
              <Text style={styles.shortcutText}>Cart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shortcutContainer}>
            <TouchableOpacity
              style={styles.shortcut}
              onPress={() => navigation.navigate('Orders')}
              // onPress={() => {
              // navigation.navigate("OrderHistory", {
              //   orderList: orders
              // })
              // }}
            >
              <View
                style={{
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#E6E6E6',
                  borderRadius: 100,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  alignContent: 'center',
                  paddingTop: 6,
                }}>
                <Image
                  source={require('../assets/AccountScreen/order.png')}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              </View>
              <Text style={styles.shortcutText}>Orders</Text>
            </TouchableOpacity>
          </View>

          {/* {/ Sections /} */}
          <TouchableOpacity
            style={[
              styles.section,
              {
                borderWidth: 1,
                borderColor: '#E6E6E6',
                borderRadius: 10,
              },
            ]}
            onPress={() => navigation.navigate('ChatScreen')}>
            <TouchableOpacity
              style={styles.sectionRow}
              onPress={() => navigation.navigate('ChatScreen')}>
              {/* <Image
              source={require('../assets/AccountScreen/mydetails.png')}
              style={{width: 25, height: 25}}
            /> */}
              <Ionicons name="chatbubbles-outline" size={24} color="black" />

              <Text style={styles.sectionText}>For Enquiry</Text>
            </TouchableOpacity>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <View
            style={[
              styles.sectionContainer,
              {
                borderWidth: 1,
                borderColor: '#E6E6E6',
                borderRadius: 10,
                marginTop: 20,
              },
            ]}>
            <View
              style={{
                marginTop: 10,
                borderLeftWidth: 5,
                borderLeftColor: redColor,
              }}>
              <Text
                style={[
                  styles.sectionHeader,
                  {
                    paddingLeft: 10,
                  },
                ]}>
                Orders
              </Text>
            </View>
            <TouchableOpacity
              style={styles.section}
              onPress={() => navigation.navigate('Address')}>
              <View style={styles.sectionRow}>
                <Image
                  source={require('../assets/AccountScreen/Address.png')}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.sectionText}>Address Book</Text>
              </View>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.sectionContainer,
              {
                borderWidth: 1,
                borderColor: '#E6E6E6',
                borderRadius: 10,
                marginTop: 20,
              },
            ]}>
            <View
              style={{
                marginTop: 10,
                borderLeftWidth: 5,
                borderLeftColor: redColor,
              }}>
              <Text
                style={[
                  styles.sectionHeader,
                  {
                    paddingLeft: 10,
                  },
                ]}>
                More
              </Text>
            </View>

            <TouchableOpacity
              style={styles.section}
              onPress={() => navigation.navigate('ReferralScreen')}>
              <View style={styles.sectionRow}>
                <Image
                  source={require('../assets/AccountScreen/product-return.png')}
                  style={{width: 24, height: 24}}
                />
                <Text style={styles.sectionText}>Referral & Earn</Text>
              </View>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.sectionDivider} />

            {/* <TouchableOpacity
              style={styles.section}
              onPress={() => navigation.navigate('ReportIssueScreen')}>
              <View style={styles.sectionRow}>
                <Image
                  source={require('../assets/AccountScreen/about.png')}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.sectionText}>Report a Issue</Text>
              </View>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.sectionDivider} /> */}

            <TouchableOpacity
              style={styles.section}
              onPress={() => navigation.navigate('AccountSettings')}>
              <View style={styles.sectionRow}>
                <AntDesign name="setting" size={20} color="black" />
                <Text style={styles.sectionText}>Settings</Text>
              </View>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.sectionDivider} />
            <TouchableOpacity style={styles.section}>
              <View style={styles.sectionRow}>
                <Icon name="power-settings-new" size={20} color={redColor} />
                <Text style={[styles.sectionText, {color: redColor}]}>
                  Logout
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  viewActivity: {
    color: redColor,
    marginTop: 4,
  },
  shortcutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  shortcut: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  shortcutText: {
    marginTop: 8,
    fontSize: 14,
  },
  moneyAmount: {
    backgroundColor: '#D1FFD0',
    borderRadius: 10,
    color: 'green',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '500',
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
  },
  sectionDivider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#eee',
  },
});
