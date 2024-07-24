// import React, { useState, useRef } from 'react';
// import { View, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text,Animated } from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
// import { redColor } from '../constants/Color';

// const { width: screenWidth } = Dimensions.get('window');

// const images = [
//     'https://plus.unsplash.com/premium_photo-1686090449200-57266c6623a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1721086130975-83605296fdbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1720469918563-8e586cdf81d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D',
//   ];

// const CarouselComponent = () => {
// const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef(null);
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     {
//       useNativeDriver: false,
//       listener: (event) => {
//         const contentOffsetX = event.nativeEvent.contentOffset.x;
//         const newIndex = Math.floor(contentOffsetX / screenWidth);
//         setActiveIndex(newIndex);
//       },
//     }
//   );
//   const renderItem = ({ item }) => (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item }} style={styles.image} />
//     </View>
//   );

//   const renderDots = () => (
//     <View style={styles.paginationContainer}>
//       {images.map((_, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.dot,
//             index === activeIndex && styles.activeDot,
//           ]}
//           onPress={() => {
//             flatListRef.current.scrollToIndex({ index });
//             setActiveIndex(index);
//           }}
//         />
//       ))}
//     </View>
//   );


//   return (
//     <View style={styles.container}>
//        <Animated.FlatList
//         data={images}
//         renderItem={renderItem}
//         keyExtractor={(item) => item}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         ref={flatListRef}
//       />
//       {renderDots()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     width: screenWidth,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#ddd',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: redColor,
//   },
// });

// export default CarouselComponent;


import React, { useRef } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Animated,Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import { black, redColor } from '../constants/Color';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.92; // Adjust the width of each item
const itemSpacing = width * 0.01;
const images = [
        'https://plus.unsplash.com/premium_photo-1686090449200-57266c6623a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1721086130975-83605296fdbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1720469918563-8e586cdf81d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D',
      ];
const CarouselComponent = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
        >
          {images?.map((item, index) => (
            <View key={index} style={{ width: width, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: item }} style={[{ width: wp(100), height: hp(22) }]} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.dotsContainer}>
        {images?.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[styles.dot, { opacity: dotOpacity, backgroundColor: redColor }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position:"absolute",
    bottom:20
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#595959',
    marginHorizontal: 4
  }
});

export default CarouselComponent;


   
      