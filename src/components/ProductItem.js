// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';

// const ProductItem = ({item}) => {
//   console.log('ProductItem', item);
//   return (
//     <View style={styles.productContainer}>
//       <Image source={item?.image} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   productContainer: {
//     marginRight: 20,
//   },
//   productImage: {
//     width: 62,
//     height: 62,
//     borderRadius: 100,
//     borderWidth:1
//   },
//   productName: {
//     marginTop: 5,
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

// export default ProductItem;

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProductItem = ({item}) => {
  console.log('ProductItem', item);
  return (
    <View style={styles.productContainer}>
      <LinearGradient
        colors={['#fa7e1e', '#feda75', '#d62976']} // You can change these colors
        style={styles.gradientBorder}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Image source={item?.image} style={styles.productImage} />
      </LinearGradient>
      <Text style={styles.productName}>{item?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginRight: 20,
  },
  gradientBorder: {
    borderRadius: 100,
    padding: 2, // Adjust padding for the gradient border
  },
  productImage: {
    width: 62,
    height: 62,
    borderRadius: 100,
    backgroundColor: 'white', // Optional: to give a white background for the image
  },
  productName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProductItem;
