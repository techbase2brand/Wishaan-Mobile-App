import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import VideoItem from './VideoItem'; // Adjust the import path as necessary

const { height } = Dimensions.get('window');

const VideoList = ({ videos, currentIndex, onViewableItemsChanged, viewabilityConfig , navigation}) => {
  return (
    <View style={{}}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <VideoItem
            key={item.video_id.toString()}
            item={item}
            index={index}
            currentIndex={currentIndex}
            isPlaying={index === currentIndex}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.video_id.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        scrollEventThrottle={16}
        snapToInterval={height}
        decelerationRate="fast"
        pagingEnabled
      />
    </View>
  );
};

export default VideoList;
