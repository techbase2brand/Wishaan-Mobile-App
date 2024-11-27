import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../components/Header';
import {
  whiteColor,
  blackColor,
  redColor,
} from '../constants/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {spacings} from '../constants/Fonts';
import {MAIN_ICON} from '../assets/Image';
import {Swipeable} from 'react-native-gesture-handler';

const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState([
    {
      identifier: '1',
      title: 'Order Shipped',
      body: 'Your order #12345 has been shipped.',
    },
    {
      identifier: '2',
      title: 'New Message',
      body: 'You have a new message from support.',
    },
    {
      identifier: '3',
      title: 'Promotion Alert',
      body: '50% off on selected items. Don’t miss out!',
    },
    {
      identifier: '4',
      title: 'Weekly Update',
      body: 'Check out this week’s popular products.',
    },
  ]);

  const removeNotification = id => {
    setNotifications(prevNotifications =>
      prevNotifications?.filter(notification => notification.identifier !== id),
    );
  };

  const renderRightActions = id => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeNotification(id)}>
      <Text style={styles.deleteText}>Remove</Text>
    </TouchableOpacity>
  );

  const renderNotification = ({item}) => (
    <Swipeable renderRightActions={() => renderRightActions(item.identifier)}>
      <View
        style={[
          styles.notificationItem,
          {
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: '#E6E6E6',
          },
        ]}>
        <View style={{width: wp(10), height: hp(6)}}>
          <Image
            source={MAIN_ICON}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '90%', paddingLeft: spacings.large}}>
          <Text style={[styles.notificationTitle, {color: blackColor}]}>
            {item?.title || 'No Title'}
          </Text>
          <Text style={[styles.notificationMessage, {color: blackColor}]}>
            {item?.body || 'No Message'}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={[styles.container, {backgroundColor: whiteColor}]}>
      <Header backIcon={true} text={'Notifications'} navigation={navigation} />
      <View style={{padding: spacings.large}}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={item => item?.identifier}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/noNotification.png')}
              style={{width: wp(20), height: hp(12), resizeMode: 'contain'}}
            />
            <Text style={[styles.emptyText, {color: blackColor}]}>
              No notifications available.
            </Text>
            <Text style={[styles.subText, {color: blackColor, marginTop: 8}]}>
              You will see your notifications here once available.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: redColor,
    marginTop: 10,
    width: wp(40),
    height: '77%',
    borderTopRightRadius:8,
    borderBottomRightRadius:8,
  },
  deleteText: {
    color: whiteColor,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
