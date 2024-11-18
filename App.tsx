/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import {
  fetchVideosRequest,
  fetchVideosSuccess,
  setCachedFiles,
} from './src/redux/actions/videoActions';
import {useDispatch} from 'react-redux';
import {Videos} from './src/constants/Constants';
import AuthNavigator from './src/navigations/AuthNavigator';
// import PushNotification from 'react-native-push-notification';
import SplashScreen from './src/screens/SplashScreen';

function App() {
  const [isVideoDownloaded, setIsVideoDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideosRequest());
    dispatch(fetchVideosSuccess(Videos));
    downloadVideos(Videos);
  }, [dispatch]);
  useEffect(() => {
    // Set the badge count to a static value, e.g., 10
    // PushNotification.setApplicationIconBadgeNumber(2);
  }, []);
  const downloadVideos = async (videoList: any) => {
    console.log(`Video URL is null or undefined for video ID:`, videoList);

    const MAX_CACHE_SIZE = 20; // Example maximum cache size
    const cachedVideos = await Promise.all(
      videoList?.map(async (video: any) => {
        if (!video.video_url) {
          console.error(
            `Video URL is null or undefined for video ID: ${video.video_id}`,
          );
          return null;
        }
        const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.video_url}.mp4`;
        try {
          const exists = await RNFetchBlob.fs.exists(localPath);
          if (!exists) {
            await RNFetchBlonb.config({path: localPath}).fetch(
              'GET',
              video.video_url,
            );
          }
          return {
            ...video,
            url: 'file://' + localPath,
            lastAccessed: Date.now(),
          };
        } catch (error) {
          console.error('Error caching video:', error);
          return null;
        }
      }),
    );

    const validCachedVideos = cachedVideos.filter(Boolean);
    console.log('Valid cached videos:', validCachedVideos);
    dispatch(setCachedFiles(validCachedVideos));
    // setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);
    // evictOldVideosIfNeeded();
  };
  if (isLoading) {
    return <SplashScreen />; // Render the splash screen while loading
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        {/* <AuthNavigator/> */}
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
