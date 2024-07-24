import React,{useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import { REEL_PLAY_BLACK, REEL_PLAY_WHITE } from '../assets/Image';

export default function RecommendedVideo({item, onPress}) {
    console.log("RecommendedVideo>>",item);
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
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
     {/* <Video
          bufferConfig={{
            minBufferMs: 2000,
            maxBufferMs: 5000,
            bufferForPlaybackMs: 1000,
            bufferForPlaybackAfterRebufferMs: 1500,
          }}
          source={{uri: convertToProxyURL(videoUrl)}}
          style={styles.thumbnail}
          resizeMode="cover"
          repeat={true}
          maxBitRate={2000000}
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
          }}/> */}
              <Image source={{ uri: item.thumb_url }} style={styles.thumbnail} />
      <Image source={REEL_PLAY_WHITE} style={styles.reelIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  thumbnail: {
    width: 160,
    height: 250,
    borderRadius: 8,
    backgroundColor:"red"
  },
  reelIcon: {
      position: 'absolute',
      top: 10,
      left: 120,
      width: 30,
      height: 30,
  },
  playButtonContainer: {
    // position: 'absolute',
    // top: '10',
    // right: '0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
