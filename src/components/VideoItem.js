import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ADD_TO_CART, SHARE, VOICE} from '../assets/Image';
import {green, redColor} from '../constants/Color';
import {toggleMute, resetMute} from '../redux/actions/videoActions';
import {useIsFocused} from '@react-navigation/native';

const VideoItem = ({item, index, currentIndex, navigation, onPress}) => {
  const isFocused = useIsFocused();
  const isMuted = useSelector(state => state.muted.isMuted); // Access global state
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const [isMuted, setIsMuted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  // const [isMuted, setIsMuted] = useState(false); // Manage mute state
  // Function to toggle mute
  // const toggleMute = () => {
  //   setIsMuted(prevState => !prevState);
  // };
  useEffect(() => {
    dispatch(resetMute());
  }, [dispatch]);

  useEffect(() => {
    console.log('All videos muted:', isMuted);
  }, [isMuted]);

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
  const videoUrl =
    'https://cdn.shopify.com/videos/c/vp/474e4c3b8a9a423ebd3d9ccf3fda0281/474e4c3b8a9a423ebd3d9ccf3fda0281.HD-1080p-4.8Mbps-32573231.mp4';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
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
      <TouchableOpacity
        style={{
          marginVertical: 10,
          backgroundColor: 'black',
          alignItems: 'center',
          objectFit: 'contain',
          position: 'absolute',
          bottom: 150,
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
      <Entypo
        name="dots-three-vertical"
        size={20}
        color="white"
        style={{position: 'absolute', top: 20, right: 10}}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconContainer}>
          <AntDesign
            onPress={handlePress}
            name={isSelected ? 'heart' : 'hearto'}
            size={20}
            color={isSelected ? redColor : 'black'}
            style={styles.icon}
          />
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
          style={styles.iconContainer}
          onPress={handleAddToCart}>
          <Image
            source={ADD_TO_CART}
            style={{
              width: 27,
              height: 27,
              marginVertical: 5,
              objectFit: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{color: 'black', width: '40%'}}>
          In publishing and graphic design more...
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={styles.ratingcontainer}>
          <Text style={styles.ratingText}>3.8</Text>
          <Icon name="star" size={16} color="#fff" />
          <Text style={styles.reviewsText}>| 3.7K</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>{'Buy Now'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10, gap: 10}}>
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
    gap: 14,
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
    marginVertical: 10,
    width: '25.2%',
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
});

export default VideoItem;
