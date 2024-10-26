import {
  View,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import VideoItem from './VideoItem';
import VipAddSection from './VipAddSection';
import {VIP_LOGO} from '../assets/Image';
import {grayColor, redColor, blackColor} from '../constants/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import RecommendedVideo from './RecommendedVideo';
import {recommendedVideos} from '../constants/Constants';
import {useCallback, useEffect, useRef, useState} from 'react';

const {height} = Dimensions.get('window');

const VideoList = ({
  cachedFiles,
  currentIndex,
  onViewableItemsChanged,
  viewabilityConfig,
  navigation,
}) => {
  const videosPerPage = 3;
  const timerRef = useRef(null);
  const VIDEO_DURATION = 5000;

  const [visibleVideoIndices, setVisibleVideoIndices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [entriesData, setEntriesData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {}, [cachedFiles, videosPerPage, page]);

  useEffect(() => {}, [cachedFiles]);

  useEffect(() => {
    loadMoreVideos();
  }, [page, videosPerPage]);

  const loadMoreVideos = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const start = (page - 1) * videosPerPage;
      const end = start + videosPerPage;
      const newVideos = filteredVideos.slice(start, end);
      if (newVideos.length === 0) {
        setAllLoaded(true);
      } else {
        setFilteredVideos(prevVideos => {
          const updatedVideos = [...prevVideos, ...newVideos];
          return updatedVideos;
        });
        setPage(prevPage => prevPage + 1);
      }
      setLoading(false);
    }, 800);
  }, [loading, page, videosPerPage]);

  const handleEndReached = () => {
    if (!loading && !allLoaded) {
      loadMoreVideos();
    }
  };

  const handlePressItem = item => {
    console.log('Video pressed:', item);
  };

  const viewabilityConfig1 = useRef({
    viewAreaCoveragePercentThreshold: 50, // Determines what percentage of the item is visible
  }).current;

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const togglePlayingVideo = () => {
    setPlayingIndex(prevIndex => (prevIndex + 1) % visibleVideoIndices.length);
  };

  useEffect(() => {
    const loadMetaobjects = async () => {
      const allEntriesData = await fetchMetaobjects();
      setEntriesData(allEntriesData);
    };

    loadMetaobjects();
  }, []);

  useEffect(() => {
    clearAllTimers();
    if (visibleVideoIndices.length > 0) {
      setPlayingIndex(0);
      timerRef.current = setInterval(togglePlayingVideo, VIDEO_DURATION);
    }
    return () => clearAllTimers();
  }, [visibleVideoIndices]);

  const onViewableItemsChanged1 = useRef(({viewableItems}) => {
    const newVisibleIndices = viewableItems.map(item => item.index);
    if (newVisibleIndices.join() !== visibleVideoIndices.join()) {
      setVisibleVideoIndices(newVisibleIndices);
    }
  }).current;

  // recommended
  const renderItem1 = useCallback(
    ({item, index}) => (
      <View key={index}>
        <RecommendedVideo
          item={item}
          isPlaying={visibleVideoIndices[playingIndex] === index}
        />
      </View>
    ),
    [visibleVideoIndices, playingIndex],
  );

  const renderItem = ({item, index}) => {
    if (index === 5) {
      // Recommended Videos Section after the first 5 videos
      return (
        <View key={`recommended-${index}`}>
          <View style={{height: 4, backgroundColor: grayColor}} />
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              {/* <Image source={REEL_PLAY_BLACK} style={styles.reelIcon} /> */}
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                  fontWeight: '600',
                  color: blackColor,
                }}>
                Recommended
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  fontWeight: '500',
                  color: redColor,
                }}>
                See All
              </Text>
            </View>
            <FlatList
              data={recommendedVideos}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem1}
              keyExtractor={item => item}
              onViewableItemsChanged={onViewableItemsChanged1}
              viewabilityConfig={viewabilityConfig1}
            />
          </View>
          <View style={{height: 4, backgroundColor: grayColor}} />
        </View>
      );
    }

    if (index > 5 && (index - 5) % 5 === 0) {
      const adIndex = ((index - 5) / 5) % entriesData.length;
      const adData = entriesData[adIndex];
      return (
        <View key={`ad-${index}`}>
          <View style={{height: 4, backgroundColor: grayColor}} />
          <View style={{marginVertical: 20, marginLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp(95),
              }}>
              <View style={{flexDirection: 'row', gap: 5, marginBottom: 10}}>
                <Image source={VIP_LOGO} style={{width: 40, height: 40}} />
                <View>
                  <Text
                    style={{fontSize: 16, fontWeight: '500', color: redColor}}>
                    {adData?.title}
                    {/* VIP Number Shop */}
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#999999'}}>
                    Sponsored
                  </Text>
                </View>
              </View>
              <Entypo name="cross" size={25} color="gray" />
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}>
              {adData?.images?.map(item => (
                <View key={item}>
                  <VipAddSection item={item} onPress={handlePressItem} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{height: 4, backgroundColor: grayColor}} />
        </View>
      );
    }

    return (
      <VideoItem
        key={`${index}`}
        item={item}
        index={index}
        currentIndex={currentIndex}
        isPlaying={index === currentIndex}
        navigation={navigation}
        // presentCheckout={presentCheckout}
        // onAddToCart={addToCartProduct}
        // onPress={() => {
        //   navigation.navigate('ProductDetails', {
        //     product: item,
        //     variant: getVariant(item),
        //     inventoryQuantity: bestDealInventoryQuantities[index],
        //     option: bestDealoptions[index],
        //   });
        // }}
        onPress={() => {
          navigation.navigate('ReelsScreen');
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={cachedFiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        showsHorizontalScrollIndicator={false}
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

export default VideoList;
