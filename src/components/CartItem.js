// import {
//   View,
//   Text,
//   Image,
//   Pressable,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import React from 'react';
// import AntDesign from 'react-native-vector-icons/dist/AntDesign';
// import {blackColor, redColor, whiteColor} from '../constants/Color';
// import {BaseStyle} from '../constants/Style';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
// import {spacings, style} from '../constants/Fonts';

// const {
//   borderRadius5,
//   flexDirectionRow,
//   flex,
//   resizeModeCover,
//   borderWidth1,
// } = BaseStyle;

// const CartItem = ({item}) => {
//   return (
//     <View
//       style={[
//         styles.productItem,
//         {
//           borderWidth: 1,
//           borderColor: '#E6E6E6',
//           backgroundColor: whiteColor,
//         },
//       ]}>
//       <Image
//         resizeMethod="resize"
//         style={[styles.productImage, resizeModeCover, borderRadius5]}
//         source={require('../assets/vipPoster.png')}
//       />
//       <View
//         style={[
//           styles.productText,
//           flex,
//           flexDirectionRow,
//         ]}>
//         <View style={[flex]}>
//           <Text style={[styles.productTitle, {color: blackColor}]}>
//             {item?.name}
//           </Text>
//           <Text
//             style={[
//               styles.productTitle,
//               {color: '#808080', fontSize: 12, marginBottom: 20},
//             ]}>
//             Color : Black
//           </Text>
//           <Text style={[styles.productPrice, {color: blackColor}]}>$ 1290</Text>
//         </View>
//         <View>
//           <View style={[styles.quantityContainer,borderWidth1]}>
//             <TouchableOpacity onPress={() => console.log('decriment')}>
//               <Text
//                 style={[
//                   styles.quantityButton,
//                 ]}>
//                 -
//               </Text>
//             </TouchableOpacity>
//             <Text style={[styles.quantity, {color: blackColor}]}>1</Text>
//             <TouchableOpacity onPress={() => console.log('incriment')}>
//               <Text
//                 style={[
//                   styles.quantityButton,

//                 ]}>
//                 +
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   productItem: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: spacings.large,
//     padding: spacings.large,
//     backgroundColor: whiteColor,
//     borderRadius: 5,
//   },
//   productItemLoading: {
//     opacity: 0.6,
//   },
//   productText: {
//     paddingLeft: 10,
//     display: 'flex',
//   },
//   productTitle: {
//     fontSize: style.fontSizeNormal1x.fontSize,
//     fontWeight: style.fontWeightThin1x.fontWeight,
//     lineHeight: 20,
//     color: blackColor,
//   },
//   productDescription: {
//     fontSize: style.fontSizeNormal.fontSize,
//   },
//   productPrice: {
//     fontSize: style.fontSizeNormal.fontSize,
//     fontWeight: style.fontWeightThin1x.fontWeight,
//     color: blackColor,
//   },
//   removeButton: {
//     marginBottom: spacings.xsmall,
//     paddingBottom: spacings.large,
//   },

//   productImage: {
//     width: wp(20),
//     height: hp(10),
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: wp(22),
//     // backgroundColor: redColor,
//     paddingHorizontal: 9,
//     paddingVertical: 2,
//     justifyContent: 'center',
//     borderRadius: 5,
//     borderColor: redColor,
//   },
//   quantityButton: {
//     paddingHorizontal: 8,
//     borderRadius: 5,
//     color: redColor,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   quantity: {
//     paddingHorizontal: 12,
//     paddingVertical: 2,
//     fontSize: 14,
//     fontWeight:'bold',
//     color: redColor,
//   },
// });
// export default CartItem;

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {blackColor, redColor, whiteColor} from '../constants/Color';
import {BaseStyle} from '../constants/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';

const {borderRadius5, flexDirectionRow, flex, resizeModeCover, borderWidth1} =
  BaseStyle;

const CartItem = ({
  item,
  toggleSelection,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <View
      style={[
        styles.productItem,
        {
          borderWidth: 1,
          borderColor: '#E6E6E6',
          backgroundColor: whiteColor,
          // paddingTop: 40,
        },
      ]}>
        {/* Toggle Button at Bottom */}
        <Pressable
          onPress={() => toggleSelection(item.id)}
          // style={{position: 'absolute', top: -30, left: 0}}
          >
          <Icon
            name={'radio-button-checked'}
            size={24}
            color={item.selected ? '#39A937' : '#e6e6e6'}
          />
        </Pressable>
        {/* Product Image */}
        <Image
          resizeMethod="resize"
          style={[styles.productImage, resizeModeCover, borderRadius5,{marginLeft:10}]}
          source={require('../assets/vipPoster.png')}
        />
   
      {/* Product Info */}
      <View style={[styles.productText, flex, flexDirectionRow]}>
        <View style={[flex]}>
          <Text style={[styles.productTitle, {color: blackColor}]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.productSubtitle,
              {color: '#808080', fontSize: 12, marginBottom: 10},
            ]}>
            Color: Black
          </Text>
          <Text style={[styles.productPrice, {color: blackColor}]}>
          ₹{item.price}
          </Text>
        </View>

        {/* Quantity Container */}
        <View>
          <View style={[styles.quantityContainer, borderWidth1]}>
            <TouchableOpacity onPress={() => console.log('decriment')}>
              <Text style={[styles.quantityButton]}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.quantity, {color: blackColor}]}>1</Text>
            <TouchableOpacity onPress={() => console.log('incriment')}>
              <Text style={[styles.quantityButton]}>+</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius: 5,
  },
  productText: {
    paddingLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'black',
  },
  productSubtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'black',
  },
  productImage: {
    width: wp(20),
    height: hp(10),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(22),
    // backgroundColor: redColor,
    paddingHorizontal: 9,
    paddingVertical: 2,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: redColor,
  },
  quantityButton: {
    paddingHorizontal: 8,
    borderRadius: 5,
    color: redColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: redColor,
  },
  toggleButton: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
});

export default CartItem;
