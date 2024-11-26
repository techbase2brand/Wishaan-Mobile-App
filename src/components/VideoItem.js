import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ADD_TO_CART, SHARE, VOICE} from '../assets/Image';
import {
  blackColor,
  goldColor,
  grayColor,
  green,
  lightGrayOpacityColor,
  redColor,
} from '../constants/Color';
import {toggleMute, resetMute} from '../redux/actions/videoActions';
import {useIsFocused} from '@react-navigation/native';
import HomeScreenModal from './Modal/HomeScreenModal';
import Carousal from './Carousal';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from '../utils';
import {BaseStyle} from '../constants/Style';
import {spacings} from '../constants/Fonts';

const {width: screenWidth} = Dimensions.get('window');
const {flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter} =
  BaseStyle;
const VideoItem = ({item, index, currentIndex, navigation, onPress}) => {
  const isFocused = useIsFocused();
  const isMuted = useSelector(state => state.muted.isMuted); // Access global state
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // Animation reference for the heart
  const heartScale = useRef(new Animated.Value(0)).current;

  // To track last tap for double tap detection
  const lastTap = useRef(null);
  const DOUBLE_TAP_DELAY = 300;
  useEffect(() => {
    dispatch(resetMute());
  }, [dispatch]);

  useEffect(() => {
    console.log('All videos muted:', isMuted);
  }, [isMuted]);

  const onPressOpenModal = () => {
    setModalVisible(true);
  };
  const handleToggleMute = () => {
    dispatch(toggleMute());
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  const onBuffer = meta => {
    console.log('Buffering:');
    setLoading(meta.isBuffering);
  };

  const handlePress = () => {
    if (!isSelected) {
      // dispatch(addToWishlist(item));
    } else {
      // dispatch(removeFromWishlist(item));
    }
    setIsSelected(!isSelected); // Toggle the state
  };

  const extractNumericId = gid => {
    const parts = gid.split('/');
    return parts[parts.length - 1]; // Get the last part
  };
  // const variantId = extractNumericId(item.variants[0].variantId);
  const [cartLoading, setCartLoading] = useState(false);
  const handleAddToCart = () => {
    // dispatch(addProductInCart(product));
  };

  const handleLike = () => {
    setIsSelected(!isSelected);
    animateHeart();
  };

  // Detect single or double tap for navigation or like functionality
  const handleSingleOrDoubleTap = () => {
    const now = Date.now();

    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected, handle the like functionality
      handleLike();
      lastTap.current = null; // Reset lastTap to avoid triggering the single tap
    } else {
      // Single tap detected, wait for a double tap, if no second tap, navigate
      lastTap.current = now;

      // Set timeout to detect single tap navigation after DOUBLE_TAP_DELAY
      setTimeout(() => {
        if (lastTap.current === now) {
          navigation.navigate('ReelsScreen');
        }
      }, DOUBLE_TAP_DELAY);
    }
  };
  const animateHeart = () => {
    heartScale.setValue(1);
    Animated.timing(heartScale, {
      toValue: 0,
      duration: 900,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };
  const renderItem = ({item}) => {
    return <Image source={{uri: item}} style={styles.carouselImage} />;
  };
  return (
    <View style={styles.container}>
      <View
        style={{height: hp(0.4), width: wp(100), backgroundColor: '#E6E6E6'}}
      />
      <View
        style={{
          marginLeft: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}>
          Regular Fit Slogan
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
          }}>
          In publishing and graphic design more
        </Text>
      </View>
      {item?.images && item?.images.length > 0 ? (
        <Carousal data={item?.images} dostsShow={true} />
      ) : (
        <TouchableOpacity
          onPress={handleSingleOrDoubleTap}
          // onPress={() => navigation.navigate('ProductDetails')}
          style={styles.videoContainer}
          activeOpacity={0.8}>
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          <Video
            bufferConfig={{
              minBufferMs: 2000,
              maxBufferMs: 5000,
              bufferForPlaybackMs: 1000,
              bufferForPlaybackAfterRebufferMs: 1500,
            }}
            // poster={item?.thumb_url}
            // posterResizeMode={'cover'}
            source={{uri: convertToProxyURL(item?.video_url)}}
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            muted={isMuted}
            maxBitRate={2000000}
            paused={!isFocused || currentIndex !== index}
            // paused={currentIndex === index ? false : true}
            hideShutterView={true}
            onLoad={handleLoad}
            onEnd={handleEnd}
            onBuffer={e => {
              if (e.isBuffering == true) {
                setLoading(true);
              } else {
                setLoading(false);
              }
            }}
          />
        </TouchableOpacity>
      )}
      {!item.images && (
        <TouchableOpacity
          style={{
            marginVertical: 10,
            backgroundColor: 'black',
            alignItems: 'center',
            objectFit: 'contain',
            position: 'absolute',
            bottom: 140,
            right: 10,
            padding: 2,
            borderRadius: 100,
            width: 30,
            height: 30,
          }}
          onPress={handleToggleMute}>
          {isMuted ? (
            <Ionicons
              name="volume-mute-outline"
              size={25}
              color="white"
              style={{
                width: 20,
                height: 20,
              }}
            />
          ) : (
            <Ionicons
              name="volume-high-outline"
              size={25}
              color="white"
              style={{
                width: 20,
                height: 20,
              }}
            />
          )}
        </TouchableOpacity>
      )}

      <Animated.View
        style={[styles.centerHeart, {transform: [{scale: heartScale}]}]}>
        <AntDesign
          name="heart"
          size={120}
          color={isSelected ? redColor : 'white'}
        />
      </Animated.View>

      <TouchableOpacity
        style={{position: 'absolute', top: 90, right: 10}}
        onPress={onPressOpenModal}>
        <Entypo name="dots-three-vertical" size={20} color="white" />
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconContainer}>
          <AntDesign
            onPress={handlePress}
            name={isSelected ? 'heart' : 'hearto'}
            size={22}
            color={isSelected ? redColor : 'black'}
            style={styles.icon}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleAddToCart}>
            <Image
              source={ADD_TO_CART}
              style={{
                width: 22,
                height: 22,
                marginVertical: 10,
                objectFit: 'contain',
              }}
            />
          </TouchableOpacity>
          <Image
            source={SHARE}
            style={{
              width: 20,
              height: 20,
              marginVertical: 10,
              objectFit: 'contain',
            }}
          />
        </View>
        <TouchableOpacity
          style={[styles.buyButton, {marginRight: 10, marginTop: 10}]}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              product: item,
            });
          }}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>{'Buy Now'}</Text>
        </TouchableOpacity>
        {/* <View style={[styles.ratingcontainer, {marginRight: 10}]}>
          <Text style={styles.ratingText}>3.8</Text>
          <Icon name="star" size={16} color="#fff" />
        </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          // marginTop:10
          marginVertical: 10,
        }}>
        <Text style={{color: 'black', width: '60%'}}>
          In publishing and graphic design more
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={{color: 'black', fontSize: 16}}>₹620</Text>
          <Text
            style={{
              fontSize: 14,
              textDecorationLine: 'line-through',
              color: '#808080',
            }}>
            ₹800
          </Text>
          <Text style={{color: green, fontSize: 14}}>60% off</Text>
        </View>

        {/* <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              product: item,
            });
          }}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>{'Buy Now'}</Text>
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          flexDirection: 'column',
          position: 'absolute',
          bottom: 20,
          right: 10,
        }}>
        <Text style={[styles.relatedProductsTitle, {color: blackColor}]}>
          {'Total Reviews(345)'}
        </Text>
        <View
          style={[styles.reviewSection, flexDirectionRow, alignItemsCenter]}>
          <View
            style={[
              {width: wp(30), marginTop: 10},
              justifyContentSpaceBetween,
              flexDirectionRow,
            ]}>
            <FontAwesome name="star" size={17} color={goldColor} />
            <FontAwesome name="star" size={17} color={goldColor} />
            <FontAwesome name="star" size={17} color={goldColor} />
            <FontAwesome name="star" size={17} color={goldColor} />
            <FontAwesome name="star-o" size={17} color={goldColor} />
          </View>
          {/* <Text
                  style={[
                    styles.optionValue,
                    {
                      marginLeft: spacings.large,
                      backgroundColor: lightGrayOpacityColor,
                      paddingHorizontal: spacings.large,
                      borderRadius: 5,
                    },
                  ]}>
                  4/5
                </Text> */}
        </View>
      </View>
      {modalVisible && (
        <HomeScreenModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 25,
    color: '#fff',
    marginTop: 20,
  },
  date: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  videoContainer: {
    width: '100%',
  },
  video: {
    width: '100%',
    height: 400,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 2,
    marginHorizontal: 10,
  },
  icon: {
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 14,
  },
  ratingcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    // width: '14%',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewsText: {
    color: '#fff',
    marginLeft: 5,
  },
  buyButton: {
    height: 30,
    width: 75,
    backgroundColor: redColor,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  },
  centerHeart: {
    position: 'absolute',
    top: '30%',
    left: '35%',
    transform: [{translateX: -40}, {translateY: -40}],
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  reviewSection: {
    width: '100%',
    // height: hp(6),
  },
});

export default VideoItem;
