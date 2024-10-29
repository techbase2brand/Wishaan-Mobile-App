import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {blackColor, redColor, whiteColor} from '../constants/Color';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import {REEL_PLAY_WHITE} from '../assets/Image';
import {staticWishList} from '../constants/Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import Header from '../components/Header';

const {
  alignJustifyCenter,
  textAlign,
  positionAbsolute,
  resizeModeContain,
  flexDirectionRow,
  flex,
  borderRadius10,
  justifyContentSpaceBetween,
  alignItemsCenter,
} = BaseStyle;
export default function SavedScreen({navigation}) {
  const VIDEO_DURATION = 5000; // 5 seconds
  const [visibleVideoIndices, setVisibleVideoIndices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const timerRef = useRef(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlayingVideo = () => {
    setPlayingIndex(prevIndex => (prevIndex + 1) % visibleVideoIndices.length);
  };

  useEffect(() => {
    clearAllTimers();
    if (visibleVideoIndices.length > 0) {
      setPlayingIndex(0);
      timerRef.current = setInterval(togglePlayingVideo, VIDEO_DURATION);
    }
    return () => clearAllTimers();
  }, [visibleVideoIndices]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    const newVisibleIndices = viewableItems.map(item => item.index);
    if (newVisibleIndices.join() !== visibleVideoIndices.join()) {
      setVisibleVideoIndices(newVisibleIndices);
    }
  }).current;

  return (
    <View style={styles.container}>
      <Header
        backIcon={true}
        text={'Saved Items'}
        navigation={navigation}
        notification={true}
      />
      {staticWishList && staticWishList.length > 0 ? (
        <View style={[styles.detailsBox]}>
          <FlatList
            // ref={flatListRef}
            data={staticWishList}
            keyExtractor={item => item?.id?.toString()}
            numColumns={2}
            renderItem={({item, index}) => {
              const isPlaying = visibleVideoIndices[playingIndex] === index;
              return (
                <View style={[styles.itemContainer]}>
                  <Pressable
                    style={[
                      positionAbsolute,
                      alignJustifyCenter,
                      styles.favButton,
                      {backgroundColor: 'white', borderRadius: 100, padding: 4},
                    ]}
                    onPress={() => handlePress(item)}>
                    <AntDesign name={'heart'} size={18} color={redColor} />
                  </Pressable>

                  <Pressable
                    style={[
                      positionAbsolute,
                      alignJustifyCenter,
                      styles.favButton1,
                    ]}
                    onPress={() => handlePress(item)}>
                    <Image
                      source={REEL_PLAY_WHITE}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </Pressable>
                  <TouchableOpacity
                    style={{
                      width: 170,
                      height: hp(20),
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                    onPress={() => {
                      navigation.navigate('ProductDetails', {
                        product: item,
                      });
                    }}
                  >
                    <Video
                      bufferConfig={{
                        minBufferMs: 2000,
                        maxBufferMs: 5000,
                        bufferForPlaybackMs: 1000,
                        bufferForPlaybackAfterRebufferMs: 1500,
                      }}
                      source={{uri: convertToProxyURL(item?.url)}}
                      style={{height: '100%', width: '100%'}}
                      paused={!isPlaying}
                      resizeMode="cover"
                      muted
                      repeat={true}
                      maxBitRate={2000000}
                      hideShutterView={true}
                      onBuffer={e => {
                        console.log('e.isBuffering', e.isBuffering);
                        if (e.isBuffering == true) {
                        } else {
                        }
                      }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: '100%',
                      height: hp(7),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={[styles.wishListItemName, {color: blackColor}]}>
                      {item?.title}
                    </Text>
                    {/* <Text style={[styles.wishListItemPrice]}>{itemCurrencyCode}</Text> */}
                  </View>
                  <View
                    style={[
                      {
                        width: '100%',
                        flexDirection: 'row',
                        paddingTop: 1,
                        justifyContent: 'space-between',
                      },
                    ]}>
                    {item?.price && (
                      <View style={{paddingTop: 8}}>
                        <Text
                          style={[
                            styles.wishListItemPrice,
                            {color: blackColor},
                          ]}>
                          {item?.price?.amount}{' '}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.buyButton}>
                      <Text
                        style={{color: '#fff', alignSelf: 'center'}}
                        onPress={() => addToCartProduct(item, 1)}>
                        Buy Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            onViewableItemsChanged={onViewableItemsChanged}
            contentContainerStyle={{paddingBottom: 100}}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      ) : (
        <View
          style={[
            styles.centeredContainer,
            alignJustifyCenter,
            {width: wp(80), alignSelf: 'center'},
          ]}>
          <View>
            <AntDesign name={'hearto'} size={50} color={colors.mediumGray} />
          </View>
          <Text
            style={{
              color: colors.blackColor,
              fontSize: style.fontSizeLarge.fontSize,
            }}>
            No Saved found.
          </Text>
          <Text style={{color: colors.mediumGray, textAlign: 'center'}}>
            You don’t have any saved items. Go to home and add some.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    width: wp(100),
    height: hp(100),
  },
  detailsBox: {
    width: wp(100),
    height: hp(80),
    padding: spacings.large,
  },
  productImage: {
    width: '100%',
    height: hp(20),
    borderRadius: 10,
  },
  favButton: {
    width: wp(8),
    height: wp(8),
    left: 15,
    top: 15,
    zIndex: 10,
    borderRadius: 5,
  },
  favButton1: {
    width: wp(8),
    height: wp(8),
    right: 15,
    top: 15,
    zIndex: 10,
    borderRadius: 5,
  },
  additemText: {
    fontSize: style.fontSizeNormal.fontSize,
    color: blackColor,
  },
  buyButton: {
    height: 30,
    width: 75,
    backgroundColor: redColor,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  },
  itemContainer: {
    padding: spacings.large,
    width: wp(48),
    borderWidth: 0.1,
  },
  itemText: {
    fontSize: style.fontSizeMedium.fontSize,
    color: blackColor,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  wishListItemName: {
    color: blackColor,
    fontSize: 14,
  },
  wishListItemPrice: {
    fontSize: 18,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
    fontFamily: 'GeneralSans-Variable',
  },
});
