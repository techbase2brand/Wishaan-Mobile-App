// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Button,
// } from 'react-native';

// const notificationsData = [
//   {
//     id: '1',
//     title: 'The best collection of trends Products',
//     description: 'At Flat 70% OFF on the Big Bold Sale',
//     image: require('../assests/AllSellingProducts/image1.png'), // Replace with your image path
//     isNew: true,
//   },
//   {
//     id: '2',
//     title: 'The best collection of trends Products',
//     description: 'At Flat 70% OFF on the Big Bold Sale',
//     image: require('../assests/AllSellingProducts/image1.png'),
//     isNew: false,
//   },
//   {
//     id: '3',
//     title: 'The best collection of trends Products',
//     description: 'At Flat 70% OFF on the Big Bold Sale',
//     image: require('../assests/AllSellingProducts/image1.png'),
//     isNew: false,
//   },
// ];

// const NotificationScreen = () => {
//   const [selectedTab, setSelectedTab] = useState('All');

//   const renderNotificationCard = ({ item }) => (
//     <View style={styles.notificationCard}>
//       <Image source={item.image} style={styles.notificationImage} />
//       <View style={styles.notificationContent}>
//         <Text style={styles.notificationTitle}>{item.title}</Text>
//         <Text style={styles.notificationDescription}>{item.description}</Text>
//         <TouchableOpacity style={styles.shopNowButton}>
//           <Text style={styles.shopNowText}>SHOP NOW</Text>
//         </TouchableOpacity>
//         {item.isNew && <Text style={styles.newBadge}>NEW</Text>}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Text style={styles.backButton}>{'<'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Notifications</Text>
//       </View>
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'All' && styles.activeTab]}
//           onPress={() => setSelectedTab('All')}
//         >
//           <Text style={styles.tabText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Order Updates' && styles.activeTab]}
//           onPress={() => setSelectedTab('Order Updates')}
//         >
//           <Text style={styles.tabText}>Order Updates</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'Promotions' && styles.activeTab]}
//           onPress={() => setSelectedTab('Promotions')}
//         >
//           <Text style={styles.tabText}>Promotions</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={notificationsData}
//         renderItem={renderNotificationCard}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   backButton: {
//     fontSize: 18,
//     color: 'black',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   activeTab: {
//     backgroundColor: 'red',
//     borderColor: 'red',
//   },
//   tabText: {
//     color: 'white',
//   },
//   notificationCard: {
//     flexDirection: 'row',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginVertical: 8,
//     overflow: 'hidden',
//   },
//   notificationImage: {
//     width: 100,
//     height: 100,
//   },
//   notificationContent: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'space-between',
//   },
//   notificationTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   notificationDescription: {
//     color: '#666',
//     marginVertical: 8,
//   },
//   shopNowButton: {
//     borderWidth: 1,
//     borderColor: 'red',
//     padding: 8,
//     alignItems: 'center',
//     borderRadius: 4,
//   },
//   shopNowText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   newBadge: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'red',
//     color: 'white',
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 3,
//     fontSize: 12,
//   },
// });

// export default NotificationScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../components/Header';
import {black, grayColor, redColor} from '../constants/Color';

const notificationsData = {
  All: [
    {
      id: '1',
      title: 'The best collection of trends Products',
      description: 'At Flat 70% OFF on the Big Bold Sale',
      image: require('../assets/vipPoster.png'), // Replace with your image path
    },
    {
      id: '2',
      title: 'More trends are here!',
      description: 'Explore the latest styles and save big.',
      broderLeft: true,
      //   image: require('../assests/AllSellingProducts/image1.png'),
    },
  ],
  'Order Updates': [
    {
      id: '3',
      title: 'Your order has been shipped',
      description: 'Track your order to see delivery details.',
      image: require('../assets/vipPoster.png'),
    },
  ],
  Promotions: [
    {
      id: '4',
      title: 'Exclusive Offer Just for You!',
      description: 'Unlock your special discount today.',
      image: require('../assets/vipPoster.png'),
    },
  ],
};

const NotificationScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('All');

  const renderNotificationCard = ({item}) => (
    <View
      style={[
        styles.notificationCard,
        {
          borderLeftWidth: item?.broderLeft && 5,
          borderLeftColor: item?.broderLeft && redColor,
        },
      ]}>
      {item.image && (
        <Image source={item.image} style={styles.notificationImage} />
      )}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowText}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={[alignJustifyCenter, { width: wp(10) }]} onPress={OnClickBackIcon}>
            <Ionicons name={"arrow-back"} size={30} color={colors.blackColor} />
          </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View> */}
      <Header
        backIcon={true}
        text={'Notifications'}
        notificationIcon={false}
        navigation={navigation}
      />
      <View style={styles.tabContainer}>
        {Object.keys(notificationsData).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={notificationsData[selectedTab]}
        renderItem={renderNotificationCard}
        keyExtractor={item => item.id}
        style={{paddingHorizontal: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButton: {
    fontSize: 18,
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderRadius:8,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    // borderRadius:8,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: redColor,
    borderColor: redColor,
    // borderWidth: 1,
    // borderBottomLeftRadius:8,
    // borderTopLeftRadius:8,
  },
  tabText: {
    color: 'black',
  },
  notificationCard: {
    flexDirection: 'Column',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notificationImage: {
    width: '100%',
    height: 100,
  },
  notificationContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDescription: {
    color: '#666',
    marginVertical: 8,
  },
  shopNowButton: {
    borderWidth: 1,
    borderColor: redColor,
    padding: 8,
    alignItems: 'center',
    borderRadius: 4,
  },
  shopNowText: {
    color: redColor,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
