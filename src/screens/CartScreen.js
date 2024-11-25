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
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import {redColor, whiteColor} from '../constants/Color';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from '../utils';
import ReportIssueButton from '../components/ReportIssueButton';

const cartItems = [
  {id: '1', name: 'Product 1', price: 1290},
  {id: '2', name: 'Product 2', price: 990},
  {id: '3', name: 'Product 3', price: 690},
  {id: '4', name: 'Product 1', price: 1290},
  {id: '5', name: 'Product 2', price: 990},
  {id: '6', name: 'Product 3', price: 690},
];

const {borderRadius10, textAlign} = BaseStyle;

export default function CartScreen({navigation}) {
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map(item => ({...item, selected: true})),
  );
  const [total, setTotal] = useState(0);

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

  const renderItem = ({item}) => (
    <CartItem item={item} toggleSelection={toggleSelection} />
  );

  return (
    <View style={{flex: 1, backgroundColor: whiteColor}}>
      <View style={{position: 'absolute', bottom: 100, right: 20, zIndex: 10}}>
        <ReportIssueButton navigation={navigation} />
      </View>
      <Header
        backIcon={true}
        text={'My Cart'}
        navigation={navigation}
        notification={true}
      />
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
});
