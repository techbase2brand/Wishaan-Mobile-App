import {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SectionList,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../components/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import ProductItem from '../components/ProductItem';
import {black, grayColor, redColor} from '../constants/Color';
import CarouselComponent from '../components/CarouselComponent';
import RecommendedVideo from '../components/RecommendedVideo';
import VideoList from '../components/VideoList';
import FastImage from 'react-native-fast-image';
import {spacings} from '../constants/Fonts';
import ReportIssueButton from '../components/ReportIssueButton';

const {width, height} = Dimensions.get('window');
const GIF = {
  id: 1,
  gif: 'https://firebasestorage.googleapis.com/v0/b/reelsclone-693a1.appspot.com/o/Wishaan%20video.gif?alt=media&token=89d51353-dfc5-4fc3-8c07-b3fe545b77c4',
};

const topSellingProducts = [
  {
    id: '1',
    name: 'Manogyam',
    image: require('../assets/AllSellingProducts/image1.png'),
  },
  {
    id: '2',
    name: 'Znine',
    image: require('../assets/AllSellingProducts/image2.png'),
  },
  {
    id: '3',
    name: 'Anab Gl',
    image: require('../assets/AllSellingProducts/image3.png'),
  },
  {
    id: '4',
    name: 'Hivagi',
    image: require('../assets/AllSellingProducts/image4.png'),
  },
  {
    id: '5',
    name: 'Extension',
    image: require('../assets/AllSellingProducts/image5.png'),
  },
];
const filters = [
  {
    id: '1',
    name: 'All',
  },
  {
    id: '2',
    name: 'Beauty Apliances',
  },
  {
    id: '3',
    name: 'Home Decor',
  },
  {
    id: '4',
    name: 'Speakers',
  },
];

export default function HomeScreen({navigation}) {
  const {loading, videos, error} = useSelector(state => state?.videos);
  const {cachedFiles} = useSelector(state => state.cachedFiles);
  const [productImagesAndTitles, setProductImagesAndTitles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  console.log('cachedFiles', videos);
  useEffect(() => {}, [videos]);
  const handleFilterPress = item => {
    setSelectedFilter(item.name);
  };

  // Render each filter button
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        item?.name === selectedFilter && styles.selectedFilterButton,
      ]}
      onPress={() => handleFilterPress(item)}>
      <Text
        style={[
          styles.filterButtonText,
          item?.name === selectedFilter && styles.selectedFilterButtonText,
        ]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const handlePressItem = item => {
    // console.log('Video pressed:', item);
  };

  // loadmore videos
  // Track if there's more content to load
  const [currentIndex, setCurrentIndex] = useState();
  const VIDEO_DURATION = 5000;
  const [visibleVideoIndices, setVisibleVideoIndices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const timerRef = useRef(null);

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

  const renderItem1 = useCallback(
    ({item, index}) => (
      <View style={styles.videoContainer}>
        <RecommendedVideo
          item={item}
          isPlaying={visibleVideoIndices[playingIndex] === index}
        />
      </View>
    ),
    [visibleVideoIndices, playingIndex],
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      setCurrentIndex(visibleItem.index);
    }
  }, []);

  const sections = [
    {
      title: 'Top Selling Product',
      data: [{type: 'header'}],
    },
    {
      title: 'Top Selling Product',
      data: [{type: 'topSellingProducts'}],
    },
    {
      title: 'Carousel',
      data: [{type: 'carousel'}],
    },
    {
      title: 'Filters',
      data: [{type: 'filters'}],
    },
    {
      title: 'videosWithAds',
      data: [{type: 'videosWithAds'}],
    },
    {
      title: 'Recommended Videos',
      data: [{type: 'recommendedVideos'}],
    },
    {
      title: 'Most Popular Sellers',
      data: [{type: 'mostPopularSellers'}],
    },
    {
      title: 'videosWithoutAds',
      data: [{type: 'videosWithoutAds'}],
    },
    {
      title: 'VIP Number Shop',
      data: [{type: 'vipNumberShop'}],
    },
    {
      title: 'Report Issue Button',
      data: [{type: 'reportIssueButton'}],
    },
  ];

  const renderSectionContent = ({item}) => {
    if (item.type === 'videosWithoutAds') {
    }
    switch (item.type) {
      case 'header':
        return (
          <Header
            navigation={navigation}
            textinput={true}
            mainIcon={true}
            menuImage={true}
            notification={true}
            saved={true}
          />
        );
      case 'topSellingProducts':
        return (
          <>
            <View style={styles.sectionTitle}>
              {/* <Text style={styles.titleText}>Top Selling Product</Text> */}
            </View>
            <FlatList
              data={topSellingProducts}
              renderItem={({item, index}) => <ProductItem item={item} />}
              keyExtractor={index => index}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            />
          </>
        );
      case 'carousel':
        return (
          <View>
            <FastImage
              source={{uri: GIF.gif}}
              resizeMode="cover"
              style={[
                {
                  width: wp(100),
                  height: hp(28),
                  marginVertical: spacings.large,
                },
              ]}
            />
          </View>
        );
      // return <CarouselComponent />;

      case 'filters':
        return (
          <FlatList
            data={filters}
            renderItem={renderItem}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          />
        );
      // case 'videosWithAds':
      //   return (
      //     <VideoList
      //       cachedFiles={videos}
      //       currentIndex={currentIndex}
      //       onViewableItemsChanged={onViewableItemsChanged}
      //       viewabilityConfig={viewabilityConfig}
      //       navigation={navigation}
      //     />
      //   );
      case 'videosWithAds':
        return (
          <VideoList
            cachedFiles={videos}
            currentIndex={currentIndex}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            navigation={navigation}
            // selectedFilter={selectedFilter}
          />
        );
      default:
        return null;
    }
  };

  return (
    // <SectionList
    //   sections={sections}
    //   keyExtractor={(item, index) => item?.type + index}
    //   renderItem={renderSectionContent}
    //   // renderSectionHeader={renderSectionHeader}
    //   contentContainerStyle={{paddingBottom: 20, backgroundColor: '#fff'}}
    //   showsVerticalScrollIndicator={false}
    // />
    <View style={{flex: 1, position: 'relative'}}>
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item?.type + index}
      renderItem={renderSectionContent}
      contentContainerStyle={{paddingBottom: 20, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}
    />

    {/* The "Report Issue" button, positioned outside SectionList */}
    <View style={{position: 'absolute', bottom: 50, right: 20, zIndex: 10}}>
      <ReportIssueButton navigation={navigation}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: wp(90),
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
  },
  sectionTitle: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
  },
  productList: {
    paddingLeft: 20,
    height: hp(10),
  },
  filterContainer: {
    marginVertical: 20,
    paddingLeft: 10,
  },
  filterButton: {
    // backgroundColor: ',
    borderRadius: 4,
    // marginRight:10,
    marginHorizontal: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 0.2,
  },
  // filterButtonText: {
  //   color: '#fff',
  // },
  selectedFilterButton: {
    backgroundColor: redColor,
    borderRadius: 4,
    borderWidth: 0,
  },
  filterButtonText: {
    fontSize: 13,
    color: '#333',
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelIcon: {
    width: 40,
    height: 40,
  },
});
