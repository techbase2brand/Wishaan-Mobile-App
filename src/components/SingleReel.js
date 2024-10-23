import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP, widthPercentageToDP } from '../utils';
import { redColor } from '../constants/Color';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const SingleReel = ({ item, index, currentIndex, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [key, setKey] = useState(0); // Key to force component re-render
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setMute(!mute)}
      style={{
        flex: 1,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "black"
      }}>

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
        // posterResizeMode={'contain'}
        // source={require('../assests/video3.mp4')}
        source={{ uri: convertToProxyURL(item?.url) }}
        repeat={true}
        muted
        maxBitRate={2000000}
        paused={currentIndex === index ? false : true}
        hideShutterView={true}
        onLoad={handleLoad}
        onEnd={handleEnd}
        onBuffer={e => {
          console.log('e.isBuffering', e.isBuffering);
          if (e.isBuffering == true) {
            setLoading(true);

          } else {
            setLoading(false);
          }
        }}
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
          resizeMode: "cover"
        }}
      />
      {/* <View
        style={{
          position: 'absolute',
          bottom: 140,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 1,
          padding: 10,
        }}>
       
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 10,
          }}>
          John Deo
        </Text>
      </View> */}
      {/* Product Information */}
      <View style={{
        position: 'absolute',
        bottom: 160,
        left: 0,
        right: 0,
        flexDirection: "column",
        paddingHorizontal: 20,
        // alignItems: 'center',
        zIndex: 1,
        // padding: 10,
      }}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              // source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image
              source={require('../assests/notificationimage.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>Deepak_Dhingra</Text>
          <Image
            source={require('../assests/ReelsIcons/tagbasis.png')}
            style={{
              width: 15,
              height: 15,
              objectFit: "contain",
              marginLeft: 5
            }}
          />
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>$620 <Text style={styles.discount}>60% off</Text></Text>
        <Text style={styles.description}>In publishing and graphic design...</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 140,
          left: 0,
          right: 10,
          alignItems: 'flex-end',
          zIndex: 1,
        }}>
        <Image
          source={require('../assests/ReelsIcons/review.png')}
          style={{
            width: 25,
            height: 25,
          }}
        />
        <Text style={{ color: 'white', marginBottom: 10 }}>200</Text>
        <AntDesign
          name="hearto"
          style={{ fontSize: 25, color: 'white' }}
        />
        <Text style={{ color: 'white', marginBottom: 10 }}>20.5k</Text>

        <Image
          source={require('../assests/ReelsIcons/sharewhite.png')}
          style={{
            width: 25,
            height: 25,
          }}
        />
        {/* <Icon
          name="share"
          style={{fontSize: 25, color: 'white', marginVertical: 10}}
        /> */}
        <Text style={{ color: 'white' }}>10.5k</Text>
        <Entypo
          name="dots-three-horizontal"
          style={{ fontSize: 25, color: 'white', marginVertical: 20 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 5,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  discount: {
    fontSize: 16,
    color: redColor,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});
export default SingleReel;