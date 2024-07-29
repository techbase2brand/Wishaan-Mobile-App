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
import { fetchVideosRequest, fetchVideosSuccess, fetchVideosFailure,fetchCachedVideosSuccess ,setCachedFiles } from './src/redux/actions/videoActions';
import axios from 'axios';


export const remoteVideos =
[
  {
    "video_id": "150",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/150_862716cb7c14fbfe75dfd3a7d7a9b053.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=150&key=c274402f03ee6970b80c223ba6dd8ed3",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/151_d704046e8c7e2be221a29f2e9125193c.png"
  },
  {
    "video_id": "168",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/168_c3b95aad0ae7e748b84c2dd6fb027560.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=168&key=536aed04b8d2f214592c26e22d8f87cd",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/169_3e5a316de9110dd045d1f838b0c5ef02.png"
  },
  {
    "video_id": "174",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/174_4d3e91dc941fdf9a954264218ae46952.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=174&key=634b9828cd4bb6e26d7feaf64679bc1e",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/175_81a4a4c2b464ef0a911a37083360b0e4.png"
  },
  {
    "video_id": "237",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/237_66352b72d5f99db5d53fde491a9d4ee3.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=237&key=2c5dcbdcf64488d04985bea0259e51ca",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/238_9b7471a7ce0a8de49dfbcd93f3c8a687.png"
  },
  {
    "video_id": "243",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/243_af1334e3c5f5b04ec025f82fcb5ff0e1.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=243&key=02beb352c9836029405f3a22542d1bf0",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/244_151297d7729354ba2816665623354be5.png"
  },
  {
    "video_id": "273",
    "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/273_4b63e51062c3eabcb902f238650875ed.mp4",
    "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=273&key=bf9ceee7f42b495a22f2b5aae78ad719",
    "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/274_40dfe8561fca00e232bece77f63ecbb8.png"
  },
  // {
  //   "video_id": "276",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/276_418a4dcbaa8044dc0698c7e91251f0e7.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=276&key=95a373453b48116f934cd9840a3e21ae",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/277_0a3430a38963a14dc477f6c6f60d0997.png"
  // },
  // {
  //   "video_id": "279",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/279_186873e84a2c983df9a557e362c580ec.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=279&key=632eddf29eb038e52c5ec31f1049ed70",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/280_d47f06cd9ac773f87bd1f8ac99183366.png"
  // },
  // {
  //   "video_id": "282",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/282_adae08b329492db47e0b4c6c2ff657d5.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=282&key=36755396785715c510be3f42f8407c4d",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/283_16b283c1dbb63f93aa57b6fed4091145.png"
  // },
  // {
  //   "video_id": "285",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/285_a22c0b02c05aa5859c8d0e2a91beebd9.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=285&key=9f747657a070c7b3f2b2de46ec62cfbb",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/286_58ddcc2cbbc6a46cb0eccab3bb3156d4.png"
  // },
  // {
  //   "video_id": "288",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/288_3708edbe8bf42c2707e9697100abe021.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=288&key=f90c16e49d887a0ff9320a6eb0d76024",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/289_bbec59e3b10799d55d7e5c8cb3957a5e.png"
  // },
  // {
  //   "video_id": "291",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/291_f53d071d590a519ebea09e39d2c52811.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=291&key=98a0149c22b2f4df19fa4da4afe86fec",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/292_40ecb6cf642f9cc4b52df1884b1dde98.png"
  // },
  // {
  //   "video_id": "294",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/294_1561fad1dc0a00c33619f08859524639.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=294&key=8a0224ca5db2fcf0fa01a86eee724cd3",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/295_853b99ae086661e34f74050d967a2135.png"
  // },
  // {
  //   "video_id": "297",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/297_db19ace84c63bf1ded0652510274fb49.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=297&key=5f8c358fad8d53f32f3aa03913f6c09f",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/298_d7d7462a2cd285ba65f9ad5aa19c84f1.png"
  // },
  // {
  //   "video_id": "300",
  //   "video_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/300_2f70ed5cf8cdd7099b2f26914fb72c1f.mp4",
  //   "secure_video_url": "http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/public.php?fid=300&key=335d1ac919f685387bca242edbb51fc8",
  //   "thumb_url": "https://d9h69f5ndiadk.cloudfront.net/storage/2024/June/week2/301_643debd34dab68428bd0c9d772ae96c6.png"
  // }
]
function App() {
  // const [cachedFiles, setCachedFiles] = useState([]);
  // console.log("cachedFiles",cachedFiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideosRequest());

    // axios
    //   .get('http://162.214.203.110/~vipnumbershop/videocrm.leafymango.com/videos.php')
    //   .then((response) => {
    //     const videos = response.data;
    //     dispatch(fetchVideosSuccess(videos));
    //   })
    //   .catch((error) => {
    //     dispatch(fetchVideosFailure(error.message));
    //   });
      dispatch(fetchVideosSuccess(remoteVideos));
      // cacheVideos(remoteVideos)
  }, [dispatch]);
  const cacheVideos = async (videoList) => {
    const MAX_CACHE_SIZE = 20; // Example maximum cache size
    const cachedVideos = await Promise.all(
      videoList?.map(async (video) => {
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
    // setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]);
  console.log('Valid cached videos:', validCachedVideos);
  dispatch(setCachedFiles(validCachedVideos));
    // dispatch(setCachedFiles((prevCachedFiles) => [...prevCachedFiles, ...validCachedVideos]));
    // evictOldVideosIfNeeded();
  };

  // const evictOldVideosIfNeeded = () => {
  //   const MAX_CACHE_SIZE = 20; // Example maximum cache size
  //   if (cachedFiles.length > MAX_CACHE_SIZE) {
  //     const sortedCache = [...cachedFiles].sort((a, b) => a.lastAccessed - b.lastAccessed);
  //     // setCachedFiles(sortedCache.slice(0, MAX_CACHE_SIZE));
  //   }
  // };

  
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
