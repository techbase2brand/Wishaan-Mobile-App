import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  blackColor,
  redColor,
  whiteColor,
  lightShadeBlue,
  mediumGray,
  grayColor,
} from '../constants/Color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';

const {width} = Dimensions.get('window');
const reviewsDataa = [
  {
    id: '1',
    name: 'Donald Rice',
    rating: 4.5,
    review:
      'The item is very good, my son likes it very much and plays every day.',
    time: '5 min ago',
    avatar:
      'https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=', // Replace with your image path
  },
  {
    id: '2',
    name: 'Elmer Roberts',
    rating: 4.5,
    review:
      'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!',
    time: '15 min ago',
    avatar:
      'https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=',
  },
  {
    id: '3',
    name: 'Elmer Roberts',
    rating: 4.5,
    review:
      'I just bought it and the stuff is really good! I highly recommend it!',
    time: '15 min ago',
    avatar:
      'https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=',
  },
];
const tabIcons = [
  // {
  //     active: require('../assets/SellerIcon/infoSeller.png'),
  //     inactive: require('../assets/SellerIcon/infoSellerRed.png')
  // },
  {
    active: require('../assets/SellerIcon/infoVideo.png'),
    inactive: require('../assets/SellerIcon/infoVideoRed.png'),
  },
  {
    active: require('../assets/SellerIcon/infostar.png'),
    inactive: require('../assets/SellerIcon/infostarRed.png'),
  },
];

const SellerProfileScreen = ({route}) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);

  const onTabPress = index => {
    setActiveTab(index);
    scrollViewRef.current.scrollTo({x: index * width, animated: true});
  };

  const onScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(contentOffsetX / width);
    setActiveTab(selectedIndex);
  };
  const [reviewRating, setReviewRating] = useState([]);
  const [reviewDescription, setReviewDescription] = useState([]);
  const [reviewsData, setReviewsData] = useState(reviewsDataa);
  const {product} = route?.params;
  //   console.log("product...", product);
  // console.log("productIDroute", product?.productId);
  // console.log("reviewsDatareviewsData", reviewsData);

  // const fetchProductMetafields = async (productID) => {
  //     // Extract the numeric product ID if you are using the GraphQL ID
  //     const numericProductID = productID.replace('gid://shopify/Product/', '');
  //     console.log("Numeric Product ID:", numericProductID);

  //     try {
  //         const response = await axios.get(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
  //             headers: {
  //                 'X-Shopify-Access-Token': ADMIN,
  //                 'Content-Type': 'application/json'
  //             }
  //         });

  //         const metafields = response.data.metafields;
  //         console.log('All Metafield Values:', metafields);
  //         // Find the metafield with the key 'rating'
  //         const ratingMetafield = metafields.find(mf => mf.key === 'rating');
  //         const descriptionMetafield = metafields.find(mf => mf.key === 'reviewdes');

  //         if (ratingMetafield) {
  //             // Parse the JSON value
  //             const parsedRating = JSON.parse(ratingMetafield.value);
  //             setReviewRating(parsedRating); // Set the review rating state
  //         }

  //         if (descriptionMetafield) {
  //             // Parse the array of review descriptions
  //             const parsedDescriptions = JSON.parse(descriptionMetafield.value);
  //             setReviewDescription(parsedDescriptions); // Set the review descriptions state
  //         }

  //     } catch (error) {
  //         console.error('Error fetching metafields:', error.message);
  //     }
  // };

  useEffect(() => {
    // fetchProductMetafields(product?.productId)
  }, []);
  useEffect(() => {
    // Combine reviewRating and reviewDescriptions into reviewsData
    const combinedReviews = reviewRating.map((rating, index) => ({
      id: (index + 1).toString(),
      name: `Reviewer ${index + 1}`, // You might replace this with actual reviewer names if available
      rating: parseFloat(rating.value),
      review: reviewDescription[index] || 'No review text available',
      time: `${(index + 1) * 5} min ago`, // Example time, you might want to calculate or replace it with actual data
      avatar:
        'https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=', // Replace with your image path
    }));

    setReviewsData(combinedReviews);
  }, [reviewRating, reviewDescription]);
  const renderReviewCard = ({item}) => (
    <View
      style={{
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
      }}>
      <View style={styles.reviewCard}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.reviewContent}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewName}>{item.name}</Text>
            <Text style={styles.reviewTime}>{item.time}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {Array.from({length: 5}, (_, index) => (
              <Icon
                key={index}
                name="star"
                size={16}
                color={index < Math.round(item.rating) ? '#FFA928' : 'grey'}
              />
            ))}
            <Text style={styles.reviewRating}>({item.rating.toFixed(1)})</Text>
          </View>
          <Text style={styles.reviewText}>{item.review}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../assets/Header/MainLogo.png')}
            style={{width: 30, height: 22}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <TouchableOpacity>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1500285927/photo/young-woman-a-university-student-studying-online.webp?b=1&s=170667a&w=0&k=20&c=w6oDn8-ru4jZhnnEt8AI6KdlgCJIgaaEZ4IMV50DnsQ=',
            }}
            style={{width: 35, height: 35, borderRadius: 40}}
          />
        </View>
      </View>
      <View style={styles.headerCoverImg}>
        <Image
          source={require('../assets/vipPoster.png')}
          style={styles.coverImage}
        />
        <TouchableOpacity style={styles.shareIcon}>
          <Feather name="share" size={22} color="black" />
          {/* <Text>🔗</Text> */}
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1500285927/photo/young-woman-a-university-student-studying-online.webp?b=1&s=170667a&w=0&k=20&c=w6oDn8-ru4jZhnnEt8AI6KdlgCJIgaaEZ4IMV50DnsQ=',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>David Smith</Text>
          <Text style={styles.location}>London ・ 187 North Gower Street</Text>
          <Text style={styles.gst}>GST: 1478547AGA478</Text>
          <Text style={styles.reviews}>
            ★★★★★ <Text style={{color: '#555'}}>(11 Reviews)</Text>
          </Text>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabIcons?.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index ? styles.activeTab : null]}
            onPress={() => onTabPress(index)}
            activeOpacity={0.9}>
            <Image
              source={activeTab === index ? tab.inactive : tab.active}
              style={styles.tabImage}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* Tab Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {/* <ScrollView style={styles.tabContent}>
                    <Text style={{ fontSize: 22, fontWeight: "500", textAlign: "center" }}>
                        About
                    </Text>
                    <Text style={styles.aboutText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries .
                    </Text>
                </ScrollView> */}
        <View style={styles.tabContent}>
          <Text style={styles.centerText}>Reels Content</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.tabContent}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryContainer}>
            {Array.from({length: 5}, (_, index) => (
              <View key={index} style={styles.summaryRow}>
                <Text>{5 - index}</Text>
                <View style={styles.summaryBarBackground}>
                  <View
                    style={[styles.summaryBar, {width: `${(5 - index) * 20}%`}]}
                  />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                4.5 <Icon name="star" size={16} color={'#FFA928'} />
              </Text>
              <Text style={styles.statLabel}>
                {reviewsData?.length} Reviews
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>88%</Text>
              <Text style={styles.statLabel}>Recommended</Text>
            </View>
          </View>
          <FlatList
            data={reviewsData}
            renderItem={renderReviewCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCoverImg: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 130,
  },
  shareIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -40, // Moves profile image upward to overlay on cover
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  gst: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  reviews: {
    fontSize: 14,
    color: 'orange',
    marginTop: 5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    width: width / 3,
    alignItems: 'center',
  },
  tabImage: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: redColor,
  },

  tabText: {
    fontSize: 16,
    color: '#333',
  },
  tabContent: {
    width,
    padding: 15,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  summaryTitle: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  summaryBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    marginHorizontal: 8,
    borderRadius: 4,
  },
  summaryBar: {
    height: 8,
    backgroundColor: redColor,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  statBox: {
    alignItems: 'center',
    paddingVertical: 5,
    width: wp(45),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingEnd: 20,
    alignContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: redColor,
  },
  reviewTime: {
    fontSize: 12,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  reviewRating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SellerProfileScreen;
