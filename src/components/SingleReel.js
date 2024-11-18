// import React, {useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Video from 'react-native-video';
// import convertToProxyURL from 'react-native-video-cache';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {heightPercentageToDP, widthPercentageToDP} from '../utils';
// import {redColor} from '../constants/Color';
// import {useIsFocused} from '@react-navigation/native';

// const MAX_RETRY_ATTEMPTS = 3;
// const RETRY_DELAY = 1000;

// const SingleReel = ({item, index, currentIndex, navigation}) => {
//   const isFocused = useIsFocused();
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const videoRef = useRef(null);
//   const [mute, setMute] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [key, setKey] = useState(0); // Key to force component re-render
//   const [loading, setLoading] = useState(true);

//   const handleLoad = () => {
//     setLoading(false);
//   };

//   const handleEnd = () => {
//     setLoading(false);
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => setMute(!mute)}
//       style={{
//         flex: 1,
//         width: widthPercentageToDP(100),
//         height: heightPercentageToDP(100),
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         backgroundColor: 'black',
//       }}>
//       {loading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       )}
//       <Video
//         bufferConfig={{
//           minBufferMs: 2000,
//           maxBufferMs: 5000,
//           bufferForPlaybackMs: 1000,
//           bufferForPlaybackAfterRebufferMs: 1500,
//         }}
//         // poster={item?.thumb_url}
//         // posterResizeMode={'contain'}
//         // source={require('../assests/video3.mp4')}
//         source={{uri: convertToProxyURL(item?.video_url)}}
//         repeat={true}
//         // muted
//         maxBitRate={2000000}
//         paused={!isFocused || currentIndex !== index}
//         // paused={currentIndex === index ? false : true}
//         hideShutterView={true}
//         onLoad={handleLoad}
//         onEnd={handleEnd}
//         onBuffer={e => {
//           if (e.isBuffering == true) {
//             setLoading(true);
//           } else {
//             setLoading(false);
//           }
//         }}
//         resizeMode="cover"
//         style={{
//           width: widthPercentageToDP(100),
//           height: heightPercentageToDP(100),
//         }}
//       />
//       {/* Product Information */}
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 160,
//           left: 0,
//           right: 0,
//           flexDirection: 'column',
//           paddingHorizontal: 20,
//           // alignItems: 'center',
//           zIndex: 1,
//           // padding: 10,
//         }}>
//         <View style={styles.header}>
//           <View style={styles.profileContainer}>
//             <Image
//               source={{uri: 'https://via.placeholder.com/100'}} // Replace with your image
//               // source={require('../assests/notificationimage.png')}
//               style={styles.profileImage}
//             />
//           </View>
//           <Text style={styles.userName}>Deepak_Dhingra</Text>
//           {/* <Image
//             source={require('../assests/ReelsIcons/tagbasis.png')}
//             style={{
//               width: 15,
//               height: 15,
//               objectFit: "contain",
//               marginLeft: 5
//             }}
//           /> */}
//           <TouchableOpacity style={styles.buyNowButton}>
//             <Text style={styles.buyNowText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.price}>
//           $620 <Text style={styles.discount}>60% off</Text>
//         </Text>
//         <Text style={styles.description}>
//           In publishing and graphic design...
//         </Text>
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 140,
//           left: 0,
//           right: 10,
//           alignItems: 'flex-end',
//           zIndex: 1,
//         }}>
//         <Image
//           source={require('../assets/ReelsIcons/review.png')}
//           style={{
//             width: 25,
//             height: 25,
//           }}
//         />
//         <Text style={{color: 'white', marginBottom: 10}}>200</Text>
//         <AntDesign name="hearto" style={{fontSize: 25, color: 'white'}} />
//         <Text style={{color: 'white', marginBottom: 10}}>20.5k</Text>

//         <Image
//           source={require('../assets/ReelsIcons/sharewhite.png')}
//           style={{
//             width: 25,
//             height: 25,
//           }}
//         />
//         {/* <Icon
//           name="share"
//           style={{fontSize: 25, color: 'white', marginVertical: 10}}
//         /> */}
//         <Text style={{color: 'white'}}>10.5k</Text>
//         <Entypo
//           name="dots-three-horizontal"
//           style={{fontSize: 25, color: 'white', marginVertical: 20}}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 40,
//     height: 40,
//   },
//   infoContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   profileImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 30,
//     marginRight: 5,
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buyNowButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#fff',
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//   },
//   buyNowText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   price: {
//     color: '#fff',
//     fontSize: 18,
//     marginTop: 10,
//   },
//   discount: {
//     fontSize: 16,
//     color: redColor,
//   },
//   description: {
//     color: '#fff',
//     fontSize: 14,
//     marginTop: 5,
//   },
// });
// export default SingleReel;

import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP, widthPercentageToDP} from '../utils';
import {redColor} from '../constants/Color';
import {useIsFocused} from '@react-navigation/native';

const SingleReel = ({item, index, currentIndex, navigation}) => {
  const isFocused = useIsFocused();
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastTap = useRef(null);
  const singleTapTimeout = useRef(null);
  const heartScale = useRef(new Animated.Value(0)).current;
  const volumeScale = useRef(new Animated.Value(1)).current; 

  // // Toggle mute on single tap
  // const handleSingleTap = () => {
  //   setMute(!mute);
  // };

  // // Handle double tap to like/unlike
  // const handleDoubleTap = () => {
  //   setLiked(!liked);
  //   animateHeart();
  // };

  // // Tap handler with double-tap detection
  // const handleTap = () => {
  //   const now = Date.now();
  //   if (lastTap.current && now - lastTap.current < 300) {
  //     handleDoubleTap();
  //   } else {
  //     lastTap.current = now;
  //     handleSingleTap();
  //   }
  // };

  // Toggle mute on single tap
  const handleSingleTap = () => {
    setMute((prevMute) => !prevMute);
    animateVolumeIcon();
  };

  // Handle double tap to like/unlike
  const handleDoubleTap = () => {
    setLiked((prevLiked) => !prevLiked);
    animateHeart();
  };

  // Tap handler with double-tap detection
  const handleTap = () => {
    const now = Date.now();

    if (lastTap.current && now - lastTap.current < 300) {
      // Double-tap detected, cancel the single-tap timeout
      clearTimeout(singleTapTimeout.current);
      handleDoubleTap();
    } else {
      // Single-tap detected, set a timeout to call handleSingleTap if no double tap occurs
      lastTap.current = now;
      singleTapTimeout.current = setTimeout(() => {
        handleSingleTap();
      }, 300);
    }
  };

  // Animate the heart when liked
  const animateHeart = () => {
    heartScale.setValue(1);
    Animated.timing(heartScale, {
      toValue: 0,
      duration: 900,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  // Animate the volume icon when muted/unmuted
  const animateVolumeIcon = () => {
    volumeScale.setValue(1.2);
    Animated.timing(volumeScale, {
      toValue: 0,
      duration: 900,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleTap}
      style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Video
        source={{uri: convertToProxyURL(item?.video_url)}}
        repeat={true}
        paused={!isFocused || currentIndex !== index}
        onLoad={handleLoad}
        resizeMode="cover"
        style={styles.video}
        muted={mute}
      />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Deepak_Dhingra</Text>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>
          $620 <Text style={styles.discount}>60% off</Text>
        </Text>
        <Text style={styles.description}>
          In publishing and graphic design...
        </Text>
      </View>
      <View style={styles.actions}>
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          style={[styles.heartIcon, {color: liked ? redColor : 'white'}]}
        />
        <Text style={styles.actionCount}>20.5k</Text>
        <Image
          source={require('../assets/ReelsIcons/sharewhite.png')}
          style={styles.shareIcon}
        />
        <Text style={styles.actionCount}>10.5k</Text>
        <Entypo
          name="dots-three-horizontal"
          style={{fontSize: 25, color: 'white', marginVertical: 20}}
        />
      </View>
      {/* Animated Heart in the Center */}
      {/* {liked && (
        <Animated.View style={[styles.centerHeart, { transform: [{ scale: heartScale }] }]}>
          <AntDesign name="heart" size={80} color={redColor} />
        </Animated.View>
      )} */}
      <Animated.View
        style={[styles.centerHeart, {transform: [{scale: heartScale}]}]}>
        <AntDesign name="heart" size={120} color={liked ? redColor : 'white'} />
      </Animated.View>
      {/* <Animated.View style={[styles.muteIconContainer, { transform: [{ scale: volumeScale }] }]}>
        <Ionicons
          name={mute ? 'volume-mute-outline' : 'volume-high-outline'}
          size={80}
          color="white"
        />
      </Animated.View> */}
        {/* <Animated.View style={[styles.muteIconContainer, { transform: [{ scale: volumeScale }] }]}>
        <FontAwesome name={mute ? "volume-mute" : "volume-up"} size={30} color="white" />
      </Animated.View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  video: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
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
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
  actions: {
    position: 'absolute',
    bottom: 140,
    right: 10,
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 25,
    marginBottom: 10,
  },
  actionCount: {
    color: 'white',
    marginBottom: 10,
  },
  shareIcon: {
    width: 25,
    height: 25,
  },
  dotsIcon: {
    fontSize: 25,
    color: 'white',
    marginVertical: 20,
  },
  centerHeart: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    transform: [{translateX: -40}, {translateY: -40}],
  },
  muteIconContainer: {
    position: 'absolute',
    position: 'absolute',
    top: '40%',
    left: '40%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 100,
    padding: 5,
  },
});

export default SingleReel;
