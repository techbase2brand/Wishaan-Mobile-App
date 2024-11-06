import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {REEL_PLAY_BLACK, REEL_PLAY_WHITE} from '../assets/Image';
import {useIsFocused} from '@react-navigation/native';

export default function RecommendedVideo({item, onPress, isPlaying}) {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  const onBuffer = meta => {
    setLoading(meta.isBuffering);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.9}>
      <Video
        bufferConfig={{
          minBufferMs: 2000,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
        source={{
          uri: convertToProxyURL(item?.video_url ? item?.video_url : item),
        }}
        style={styles.thumbnail}
        resizeMode="cover"
        repeat={true}
        muted
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
        }}
        // paused={!isFocused || currentIndex !== index}
        paused={!isFocused || !isPlaying}
      />
      <Image source={REEL_PLAY_WHITE} style={styles.reelIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    position: 'relative',
    borderRadius: 10,
    width: 160,
    height: 250,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  reelIcon: {
    position: 'absolute',
    top: 10,
    left: 120,
    width: 30,
    height: 30,
  },
  playButtonContainer: {},
});
