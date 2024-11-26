// import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
// import React from 'react';
// import CartItem from '../components/CartItem';
// import Header from '../components/Header';
// import {redColor, whiteColor} from '../constants/Color';
// import {spacings, style} from '../constants/Fonts';
// import {BaseStyle} from '../constants/Style';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
// import ReportIssueButton from '../components/ReportIssueButton';

// // Mock data for cart items
// const cartItems = [
//   {id: '1', name: 'Product 1'},
//   {id: '2', name: 'Product 2'},
//   {id: '3', name: 'Product 3'},
// ];

// const {borderRadius10, textAlign} = BaseStyle;

// export default function CartScreen({navigation}) {
//   const renderItem = ({item}) => <CartItem item={item} />;

//   return (
//     <View style={{flex: 1, backgroundColor: whiteColor}}>
//       <View style={{position: 'absolute', bottom: 100, right: 20, zIndex: 10}}>
//         <ReportIssueButton navigation={navigation} />
//       </View>
//       <Header
//         backIcon={true}
//         text={'My Cart'}
//         navigation={navigation}
//         notification={true}
//       />
//       <View style={styles.container}>
//         <FlatList
//           data={cartItems}
//           renderItem={renderItem}
//           keyExtractor={item => item?.id}
//           contentContainerStyle={{paddingVertical: 10}}
//         />
//       </View>
//       <View style={styles.addToCartButtonContainer}>

//         <Pressable
//           // disabled={loading || !variantSelected}
//           style={[styles.addToCartButton, borderRadius10, {width: wp(45)}]}
//           // onPress={() => variant?.id && onAddToCart(variant.id, quantity)}
//         >
//           {/* {loading ? (
//               <View style={[styles.addToCartButtonLoading, textAlign]}>
//                 <ActivityIndicator size="small" color={whiteColor} />
//               </View>
//             ) : ( */}
//           <Text
//             style={[
//               styles.addToCartButtonLoading,
//               textAlign,
//               {color: whiteColor},
//             ]}>
//             Buy Now
//           </Text>
//           {/* )} */}
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   addToCartButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     margin: 10,
//   },
//   addToCartButton: {
//     fontSize: style.fontSizeExtraExtraSmall.fontSize,
//     backgroundColor: redColor,
//     padding: spacings.xxLarge,
//   },
//   outOfStockButton: {
//     width: wp(60),
//     fontSize: style.fontSizeExtraExtraSmall.fontSize,
//     backgroundColor: redColor,
//     paddingHorizontal: spacings.xxLarge,
//     paddingVertical: 8,
//     alignSelf: 'center',
//   },
//   addToCartButtonText: {
//     fontSize: style.fontSizeNormal.fontSize,
//     lineHeight: 20,
//     color: whiteColor,
//     fontWeight: style.fontWeightThin1x.fontWeight,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import {blackColor, redColor, whiteColor} from '../constants/Color';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP, widthPercentageToDP as wp} from '../utils';
import ReportIssueButton from '../components/ReportIssueButton';

const cartItems = [
  {id: '1', name: 'Product 1', price: 1290},
  {id: '2', name: 'Product 2', price: 990},
  {id: '3', name: 'Product 3', price: 690},
  {id: '4', name: 'Product 1', price: 1290},
  {id: '5', name: 'Product 2', price: 990},
  {id: '6', name: 'Product 3', price: 690},
];

const {alignItemsCenter, flexDirectionRow, alignJustifyCenter} = BaseStyle;

export default function CartScreen({navigation}) {
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map(item => ({...item, selected: true})),
  );
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const addresses = [
    {
      id: '1',
      type: 'Home',
      details: '49 Featherstone Street, LONDON EC1Y 8SY',
      phone: '+157 214 2541',
    },
    {
      id: '2',
      type: 'Office',
      details: '10 Downing Street, LONDON SW1A 2AA',
      phone: '+157 999 9999',
    },
  ];

  // Calculate the total whenever selectedItems changes
  useEffect(() => {
    const totalCost = selectedItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    setTotal(totalCost);
  }, [selectedItems]);

  const toggleSelection = id => {
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, selected: !item.selected} : item,
      ),
    );
  };

  const selectAddress = address => {
    setSelectedAddress(address.id);
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <CartItem item={item} toggleSelection={toggleSelection} />
  );

  return (
    <View style={{flex: 1, backgroundColor: whiteColor}}>
      <View style={{position: 'absolute', bottom: 100, right: 20, zIndex: 10}}>
        <ReportIssueButton navigation={navigation} />
      </View>
      <View style={[flexDirectionRow, alignItemsCenter, {marginBottom: 20}]}>
        <TouchableOpacity
          style={[alignJustifyCenter, {width: wp(10)}]}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={25} color={blackColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{marginLeft: 20}}>
          <Text style={{fontWeight: '700'}}>
            Delivery at{' '}
            {addresses?.find(addr => addr?.id === selectedAddress)?.type}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.addressText}>
              {selectedAddress
                ? addresses?.find(addr => addr?.id === selectedAddress)?.details
                : 'Select an address'}
            </Text>
            <Entypo name={'chevron-small-down'} size={25} color={blackColor} />
          </View>
        </TouchableOpacity>
      </View>
      {/* <Header
        backIcon={true}
        text={'My Cart'}
        navigation={navigation}
        notification={true}
      /> */}
      <View style={styles.container}>
        <FlatList
          data={selectedItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical: 10}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.addToCartButtonContainer}>
        <Text>hcvbjdhsz</Text>
        <Pressable style={styles.button}>
          {/* Total Amount */}
          <View>
            <Text style={styles.totalText}>₹{total}</Text>
            <Text style={{color: '#ffff'}}> Total </Text>
          </View>
          {/* Place Order Text */}
          <Text style={styles.buttonText}>Place Order</Text>
          {/* Triangle Icon */}
          <AntDesign
            name="right"
            size={16}
            color={whiteColor}
            style={styles.icon}
          />
        </Pressable>
      </View>
      {/* <View style={styles.addToCartButtonContainer}>
        <Pressable
          style={[styles.addToCartButton, borderRadius10, { width: wp(60) }]}
          onPress={() => console.log('Selected Items:', selectedItems.filter((item) => item.selected))}
        >
          <Text style={[styles.addToCartButtonLoading, textAlign, { color: whiteColor }]}>
            Buy Now (₹{total})
          </Text>
        </Pressable>
      </View> */}
      {/* Modal for Address Selection */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Address</Text>

          <TouchableOpacity
            style={[
              styles.section,
              {
                borderWidth: 1,
                borderColor: '#E6E6E6',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 4,
                marginVertical: 20,
                width: wp(94),
              },
            ]}>
            <View style={styles.sectionRow}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => navigation.navigate('ConfirmDeliveryLocation')}>
                <AntDesign name="plus" size={20} color={redColor} />
                <Text
                  style={[styles.addAddress, {marginTop: 2, marginLeft: 2}]}>
                  Add Address
                </Text>
              </TouchableOpacity>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          {/* <FlatList
            data={addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.addressItem}
                onPress={() => selectAddress(item)}
              >
                <Text style={styles.addressText}>{item}</Text>
              </TouchableOpacity>
            )}
          /> */}
          <FlatList
            data={addresses}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.addressCard}
                activeOpacity={0.9}
                onPress={() => selectAddress(item)}>
                <View style={styles.addressRow}>
                  <View>
                    <Text style={styles.addressName}>{item.type}</Text>
                    <Text style={[styles.orderId, {width: '80%'}]}>
                      {item.details}
                    </Text>
                    <Text style={[styles.addressPhone]}>
                      Phone Number: {item.phone}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => selectAddress(item)}
                  activeOpacity={0.9}>
                  <Icon
                    name={
                      selectedAddress === item.id
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                    color={redColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          {/* <View style={styles.adsContainer}> */}
          <Image
            source={require('../assets/vipPoster.png')}
            style={styles.adsImage}
          />
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  addToCartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: whiteColor,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  addToCartButton: {
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    backgroundColor: redColor,
    padding: spacings.xxLarge,
  },
  addToCartButtonLoading: {
    fontSize: style.fontSizeNormal.fontSize,
    lineHeight: 20,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: redColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: wp(60), // Adjusts button width for responsiveness
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: whiteColor,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: whiteColor,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    // flex: 1,
    height: heightPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: blackColor,
    marginTop: 20,
    textAlign: 'center',
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 12,
    color: '#555',
  },
  addressCard: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
  },
  addressName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  returnPickup: {
    fontSize: 14,
    color: redColor,
    marginBottom: 4,
  },
  exchangeAvailable: {
    fontSize: 14,
    color: redColor,
  },
  radioButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 16,
  },
  adsContainer: {
    // marginBottom: 80,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: redColor,
    marginBottom: 8,
  },
  adsImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});
