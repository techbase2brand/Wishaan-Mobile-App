// // components/VideoItem.js
// import React from 'react';
// import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
// import Video from 'react-native-video';

// const VideoItem = ({videoUri, onPress, index, currentIndex}) => {
//   return (
//     <View style={{ flex:1,  width:"100%", height:"100%"}}>
//       <Text style={{marginLeft: 20, fontSize: 25, color: '#fff', marginTop:20}}>
//         John Doe
//       </Text>
//       <Text style={{marginLeft: 20, fontSize: 20, color: '#fff'}}>
//         march, 20
//       </Text>
//       <TouchableOpacity onPress={onPress} style={styles.container}>
//         <Video
//           source={videoUri}
//           style={styles.video}
//           resizeMode="cover"
//           repeat={true}
//           paused={currentIndex == index ? false : true}
//           muted
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     // height:'100%',
//     marginBottom: 60,
//     marginTop: 80,
//   },
//   video: {
//     width: '100%',
//     height: 400,
//   },
// });

// export default VideoItem;

import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {ADD_TO_CART, SHARE, VOICE} from '../assets/Image';
import {green, redColor} from '../constants/Color';

const {height} = Dimensions.get('window');

const VideoItem = ({item, index, currentIndex}) => {
  const handleProgress = progress => {
    setLoading(false);
    // console.log('Progress:', progress.currentTime);"react-native-video": "^5.2.1",
  };
  const [loading, setLoading] = useState(true);

 

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
  const videoUrl =
    'https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/150_862716cb7c14fbfe75dfd3a7d7a9b053.mp4';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={onPress && onPress}
        style={styles.videoContainer}
        activeOpacity={0.8}>
        {/* <ImageBackground
          source={{
            uri: item?.thumb_url}}
          style={styles.video}
          resizeMode="cover"> */}
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
          poster={item?.thumb_url}
          posterResizeMode={'cover'}
          source={{uri: convertToProxyURL(item?.video_url)}}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          maxBitRate={2000000}
          paused={currentIndex === index ? false : true}
          hideShutterView={true}
          onLoad={handleLoad}
          onEnd={handleEnd}
          onBuffer={e => {
            console.log('e.isBuffering', e.isBuffering);
            if (e.isBuffering) {
              setLoading(true);
            } else {
              setLoading(false);
            }
          }}
          // onProgress={handleProgress}
        />
        {/* </ImageBackground> */}
      </TouchableOpacity>
      <Image
        source={VOICE}
        style={{
          width: 30,
          height: 30,
          marginVertical: 10,
          objectFit: 'contain',
          position: 'absolute',
          bottom: 180,
          right: 10,
        }}
      />
      <Entypo
        name="dots-three-vertical"
        size={25}
        color="white"
        style={{position: 'absolute', top: 20, right: 10}}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="hearto"
            size={25}
            color="black"
            style={styles.icon}
          />
          <Icon name="comment-o" size={25} color="black" style={styles.icon} />
          <Image
            source={SHARE}
            style={{
              width: 24,
              height: 24,
              marginVertical: 10,
              objectFit: 'contain',
            }}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={ADD_TO_CART}
            style={{
              width: 27,
              height: 27,
              marginVertical: 10,
              objectFit: 'contain',
            }}
          />
        </View>
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
        <TouchableOpacity style={styles.buyButton}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10, gap: 10}}>
        <Text style={{color: 'black', fontSize: 16}}>$620</Text>
        <Text style={{fontSize: 14}}>$800</Text>
        <Text style={{color: green, fontSize: 14}}>60% off</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
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
    // flex: 1,
    width: '100%',
    // marginTop: 40,
  },
  video: {
    width: '100%',
    height: 400,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 14,
    // justifyContent: 'space-between',
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
    backgroundColor: green,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '25%',
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
