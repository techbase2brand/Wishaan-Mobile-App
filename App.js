/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import RNFetchBlob from 'rn-fetch-blob';
import HomeScreen from './src/screens/HomeScreen';
// redux
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { fetchVideosRequest, fetchVideosSuccess, fetchVideosFailure,fetchCachedVideosSuccess  } from './src/redux/actions/videoActions';
import axios from 'axios';

function App() {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchVideosRequest());

  //   axios
  //     .get('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php')
  //     .then((response) => {
  //       const videos = response.data;
  //       dispatch(fetchVideosSuccess(videos));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchVideosFailure(error.message));
  //     });
  // }, [dispatch]);


  const [cachedFiles, setCachedFiles] = useState([]);

  useEffect(() => {
    const fetchAndCacheVideos = async () => {
      dispatch(fetchVideosRequest());

      try {
        const response = await axios.get('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php');
        const videoList = response.data;

        dispatch(fetchVideosSuccess(videoList));
         cacheVideos(videoList);
      } catch (error) {
        dispatch(fetchVideosFailure(error.message));
      }
    };

    fetchAndCacheVideos();
  }, [dispatch]);

  const cacheVideos = async (videoList) => {
    const MAX_CACHE_SIZE = 20; // Example maximum cache size
    const cachedVideos = await Promise.all(
      videoList.map(async (video) => {
        if (!video.video_url) {
          console.error(`Video URL is null or undefined for video ID: ${video.video_id}`);
          return null;
        }
        const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${video.video_id}.mp4`;
        try {
          const exists = await RNFetchBlob.fs.exists(localPath);
          if (!exists) {
            await RNFetchBlob.config({ path: localPath }).fetch('GET', video.video_url);
          }
          return { ...video, url: 'file://' + localPath, lastAccessed: Date.now() };
        } catch (error) {
          console.error('Error caching video:', error);
          return null;
        }
      })
    );

    const validCachedVideos = cachedVideos.filter(Boolean);
    setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);
    dispatch(fetchCachedVideosSuccess(cachedFiles));
    evictOldVideosIfNeeded();
  };

  const evictOldVideosIfNeeded = () => {
    const MAX_CACHE_SIZE = 20; // Example maximum cache size
    if (cachedFiles.length > MAX_CACHE_SIZE) {
      const sortedCache = [...cachedFiles].sort((a, b) => a.lastAccessed - b.lastAccessed);
      setCachedFiles(sortedCache.slice(0, MAX_CACHE_SIZE));
      dispatch(fetchCachedVideosSuccess(sortedCache.slice(0, MAX_CACHE_SIZE)));
    }
  };
  return (
   
    <SafeAreaView style={{flex:1}}>
      {/* <HomeScreen/> */}
     <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
    </SafeAreaView>
  );
}


export default App;
