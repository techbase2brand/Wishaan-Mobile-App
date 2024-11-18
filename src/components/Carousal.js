import React, {useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {blackColor, redColor} from '../constants/Color';
const {width} = Dimensions.get('window');
const itemWidth = width * 0.92; // Adjust the width of each item
const itemSpacing = width * 0.01;

const Carousal = ({data, renderItem, dostsShow}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          // contentContainerStyle={{ paddingHorizontal: itemSpacing / 1 }}
        >
          {data?.map((item, index) => (
            <View
              key={index}
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item}}
                style={[{width: '100%', height: 400}]}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      {dostsShow && data?.length > 1 && (
        <View style={styles.dotsContainer}>
          {data?.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index.toString()}
                style={[
                  styles.dot,
                  {opacity: dotOpacity, backgroundColor: redColor},
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginHorizontal: 4,
  },
});

export default Carousal;
