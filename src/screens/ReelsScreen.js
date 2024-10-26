import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
// import PagerView from 'react-native-pager-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SingleReel from '../components/SingleReel';
import {useSelector} from 'react-redux';

const MAX_CACHE_SIZE = 20;
const {height} = Dimensions.get('window');
const ReelsScreen = ({route, navigation}) => {
  const {videos, error} = useSelector(state => state?.videos);

  const [currentIndex, setCurrentIndex] = useState();
  const [ReelsVideos, setReelsVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const productMedia = videos?.map(productEdge => {
    const productId = productEdge?.node?.id;
    const title = productEdge?.node?.title;
    const description = productEdge?.node?.descriptionHtml;
    const tags = productEdge?.node?.tags;
    const variants = productEdge?.node?.variants?.edges?.map(variantEdge => ({
      variantId: variantEdge?.node?.id,
      // variantTitle: variantEdge?.node?.title,
    }));
    const media = productEdge?.node?.media?.edges?.map(mediaEdge => ({
      ...mediaEdge?.node?.sources[0],
      productId,
      title,
      description,
      variants,
      tags,
    }));
    return media;
  });
  const productVideosUrl = productMedia
    ?.reduce((acc, val) => acc.concat(val), [])
    .filter(Boolean);

  const videosPerPage = 10;

  useEffect(() => {
    loadMoreVideos();
  }, []);

  const insertAds = videoArray => {
    let result = [];
    videoArray.forEach((video, index) => {
      result.push(video);
      if ((index + 1) % 10 === 0) {
        result.push({isAd: true, id: `ad-${index}`});
      }
    });
    return result;
  };

  const loadMoreVideos = () => {
    if (loading || allLoaded) return;

    setLoading(true);

    // Simulate an API call or data fetching
    setTimeout(() => {
      const start = (page - 1) * videosPerPage;
      const end = start + videosPerPage;
      const newVideos = videos.slice(start, end);

      if (newVideos.length === 0) {
        setAllLoaded(true); // Set flag if no more videos to load
      } else {
        setReelsVideos(prevVideos => [...prevVideos, ...newVideos]);
        setPage(prevPage => prevPage + 1);
      }
      setLoading(false);
    }, 10); // Simulated delay
  };

  const handleEndReached = () => {
    if (!loading && !allLoaded) {
      loadMoreVideos();
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      setCurrentIndex(visibleItem.index);
    }
  }, []);
  const onPageSelected = useCallback(
    event => {
      const newIndex = event.nativeEvent.position;
      setCurrentIndex(newIndex);
      // updateLastAccessedTime(cachedFiles[newIndex]);

      // Fetch more videos if nearing the end of the list
      if (newIndex >= videos.length - 2) {
        // fetchMoreVideos();
      }
    },
    [ReelsVideos],
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
        <Text
          style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            style={{fontSize: 25, color: 'white', marginTop: 10}}
          />
        </Text>
        {/* <AntDesign name="camerao" style={{fontSize: 25, color: 'white'}} /> */}
      </View>
      {/* <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
        orientation="vertical">
        {ReelsVideos?.map((item, index) => {
          console.log(item,"item")
          return(
          <SingleReel
          key={index}
          item={item}
          index={index}
          currentIndex={currentIndex}
          isPlaying={index === currentIndex}
          navigation={navigation}
          />
        )
        })}
      </PagerView> */}
      <FlatList
        data={ReelsVideos}
        // renderItem={renderItem}
        renderItem={({item, index}) => (
          <SingleReel
            key={index}
            item={item}
            index={index}
            currentIndex={currentIndex}
            isPlaying={index === currentIndex}
            navigation={navigation}
          />
        )}
        style={styles.pagerView}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        snapToInterval={height}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        decelerationRate="fast"
        pagingEnabled
        ListFooterComponent={
          loading && !allLoaded ? <ActivityIndicator /> : null
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default ReelsScreen;
