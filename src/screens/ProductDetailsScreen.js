import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {REEL_PLAY_WHITE} from '../assets/Image';
import FeatureIcons from '../components/FeatureIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {
  blackColor,
  redColor,
  whiteColor,
  lightGrayOpacityColor,
  goldColor,
} from '../constants/Color';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {RATING_REVIEWS, recommendedVideos} from '../constants/Constants';
import RecommendedVideo from '../components/RecommendedVideo';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {
  alignJustifyCenter,
  flexDirectionRow,
  justifyContentSpaceBetween,
  borderRadius10,
  textAlign,
  positionAbsolute,
  alignItemsCenter,
  resizeModeContain,
  textDecorationUnderline,
} = BaseStyle;

function ProductDetailsScreen({navigation, route}) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  return (
    <View style={[styles.container, {backgroundColor: whiteColor}]}>
      <Header
        backIcon={true}
        text={'Details'}
        notification={true}
        navigation={navigation}
      />
      <ProductDetails
        product={route?.params?.product}
        navigation={navigation}
      />
    </View>
  );
}

function ProductDetails({
  product,
  loading = false,
  relatedProducts,
  navigation,
}) {
  const VIDEO_DURATION = 5000;
  const timerRef = useRef(null);
  console.log('productproduct', product);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [shareProductloading, setShareProductLoading] = useState(false);
  const [shopCurrency, setShopCurrency] = useState('');
  const [visibleVideoIndices, setVisibleVideoIndices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [visibleVideoIndicesSaved, setVisibleVideoIndicesSaved] = useState([]);
  const [playingIndexSaved, setPlayingIndexSaved] = useState(0);

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

  // const VIDEO_DURATION = 5000; // 5 seconds

  // const timerRef = useRef(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const SavedclearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlayingVideoSaved = () => {
    setPlayingIndexSaved(
      prevIndex => (prevIndex + 1) % visibleVideoIndicesSaved.length,
    );
  };

  useEffect(() => {
    clearAllTimers();
    if (visibleVideoIndicesSaved.length > 0) {
      setPlayingIndexSaved(0);
      timerRef.current = setInterval(togglePlayingVideoSaved, VIDEO_DURATION);
    }
    return () => SavedclearAllTimers();
  }, [visibleVideoIndicesSaved]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    const newVisibleIndices = viewableItems.map(item => item.index);
    if (newVisibleIndices.join() !== visibleVideoIndicesSaved.join()) {
      setVisibleVideoIndicesSaved(newVisibleIndices);
    }
  }).current;

  return (
    <View>
      <ScrollView
        style={{width: '100%', height: '93.8%', paddingBottom: spacings.large}}
        showsVerticalScrollIndicator={false}>
        <View
          key={product?.id}
          style={[
            styles.productItem,
            borderRadius10,
            {width: '100%', paddingBottom: hp(12)},
          ]}>
          <View
            style={{
              width: wp(95),
              height: hp(40),
              overflow: 'hidden',
              borderRadius: 10,
            }}>
            <Video
              bufferConfig={{
                minBufferMs: 2000,
                maxBufferMs: 5000,
                bufferForPlaybackMs: 1000,
                bufferForPlaybackAfterRebufferMs: 1500,
              }}
              // poster={item?.thumb_url}
              // posterResizeMode={'cover'}
              source={{uri: convertToProxyURL(product?.url)}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
              repeat={true}
              muted
              maxBitRate={2000000}
              hideShutterView={true}
              onBuffer={e => {
                if (e.isBuffering == true) {
                  // setLoading(true);
                } else {
                  // setLoading(false);
                }
              }}
            />
          </View>
          <TouchableOpacity
            style={[positionAbsolute, alignJustifyCenter, styles.favButton]}
            // onPress={onPressFavButton}
          >
            <AntDesign name={'heart'} size={18} color={redColor} />
          </TouchableOpacity>
          <View style={[styles.productText, justifyContentSpaceBetween]}>
            <View>
              <View style={[flexDirectionRow, {width: '100%'}]}>
                <View style={{width: '90%'}}>
                  <Text style={[styles.productTitle, {color: blackColor}]}>
                    {'Regular Fit Slogan'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[alignJustifyCenter, styles.shareButton]}
                  onPress={() => shareProduct(product.id)}>
                  <Image
                    source={require('../assets/shareRed.png')}
                    style={{
                      width: 24,
                      height: 24,
                      marginVertical: 10,
                      objectFit: 'contain',
                    }}
                  />
                  {/* <FontAwesome name="share" size={20} color={isDarkMode ? lightPink : "#B5A2A2"} /> */}
                </TouchableOpacity>
              </View>
              <View
                style={[flexDirectionRow, {width: '100%', marginVertical: 10}]}>
                {/* <Text style={[styles.productPrice, { color: blackColor }]}>{(variant?.price?.amount) ? (variant?.price?.amount) : (variant?.price)} {(variant?.price?.currencyCode) ? (variant?.price?.currencyCode) : shopCurrency}</Text> */}

                <Text style={[styles.productPrice, {color: blackColor}]}>
                  $ 620
                </Text>
                <Pressable
                  style={[
                    flexDirectionRow,
                    alignItemsCenter,
                    {marginLeft: spacings.large},
                  ]}>
                  <FontAwesome name="star" size={15} color={goldColor} />
                  <Text
                    style={[styles.productDescription, {color: blackColor}]}>
                    {' '}
                    <Text
                      style={[
                        styles.productDescription,
                        textDecorationUnderline,
                        {
                          fontWeight: style.fontWeightMedium1x.fontWeight,
                          color: blackColor,
                        },
                      ]}>
                      4.0/5
                    </Text>{' '}
                    (45 reviews)
                  </Text>
                </Pressable>
              </View>
              {/* {product.description && */}
              <Pressable
                // onPress={toggleExpanded}
                style={{marginVertical: spacings.large}}>
                <Text
                  style={[styles.productDescription, {color: '#808080'}]}
                  numberOfLines={expanded ? null : 3}
                  ellipsizeMode="tail">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat{' '}
                </Text>
              </Pressable>
              {/* }mar  */}
            </View>
            <View style={{marginBottom: spacings.large}}>
              {/* <Text style={styles.relatedProductsTitle}>{SELECT_VARIANTS}</Text> */}
              <View>
                {/* {options?.map((option, index) => (
                  <View key={index} style={styles.optionContainer}>
                    <Text style={styles.relatedProductsTitle}>Choose {option?.name}</Text>
                    <View style={[flexDirectionRow, { marginTop: spacings.large }]}>
                      <ScrollView horizontal>
                        {option?.values.map((value, idx) => (
                          <TouchableOpacity key={idx} onPress={() => handleSelectOption(option?.name, value)} style={[styles.optionValueContainer, flexDirectionRow, borderRadius5, alignJustifyCenter, selectedOptions[option.name] === value ? { backgroundColor: redColor, borderWidth: 0 } : { backgroundColor: whiteColor }]}>
                            <Text style={[styles.optionValue, selectedOptions[option?.name] === value && { color: whiteColor }]}>{value}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                ))} */}
                {/* {options?.map((option, index) => {
                  if (
                    option.name === 'Title' &&
                    option.values.includes('Default Title')
                  ) {
                    return null; // Skip rendering this option
                  } */}

                {/* return (
                    <View key={index} style={styles.optionContainer}>
                      <Text
                        style={[
                          styles.relatedProductsTitle,
                          {color: blackColor},
                        ]}>
                        Choose {option?.name}
                      </Text>
                      <View
                        style={[flexDirectionRow, {marginTop: spacings.large}]}>
                        <ScrollView horizontal>
                          {option?.values.map((value, idx) => (
                            <TouchableOpacity
                              key={idx}
                              onPress={() =>
                                handleSelectOption(option?.name, value)
                              }
                              style={[
                                styles.optionValueContainer,
                                flexDirectionRow,
                                borderRadius5,
                                alignJustifyCenter,
                                selectedOptions[option.name] === value
                                  ? {
                                      backgroundColor: redColor,
                                      borderWidth: 0,
                                    }
                                  : {backgroundColor: whiteColor},
                              ]}>
                              <Text
                                style={[
                                  styles.optionValue,
                                  selectedOptions[option?.name] === value && {
                                    color: whiteColor,
                                  },
                                ]}>
                                {value}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  ); */}
                {/* })} */}
              </View>
            </View>
            <FeatureIcons />
            <View style={{marginBottom: spacings.large}}>
              <Text style={[styles.relatedProductsTitle, {color: blackColor}]}>
                {'Rating Reviews'}
              </Text>
              <View
                style={[
                  styles.reviewSection,
                  flexDirectionRow,
                  alignItemsCenter,
                ]}>
                <View
                  style={[
                    {width: wp(30)},
                    justifyContentSpaceBetween,
                    flexDirectionRow,
                  ]}>
                  <FontAwesome name="star" size={17} color={goldColor} />
                  <FontAwesome name="star" size={17} color={goldColor} />
                  <FontAwesome name="star" size={17} color={goldColor} />
                  <FontAwesome name="star" size={17} color={goldColor} />
                  <FontAwesome name="star-o" size={17} color={goldColor} />
                </View>
                <Text
                  style={[
                    styles.optionValue,
                    {
                      marginLeft: spacings.large,
                      backgroundColor: lightGrayOpacityColor,
                      paddingHorizontal: spacings.large,
                      borderRadius: 5,
                    },
                  ]}>
                  4/5
                </Text>
              </View>
              <View style={[flexDirectionRow, alignItemsCenter]}>
                <View
                  style={[{width: wp(20), height: hp(10)}, alignItemsCenter]}>
                  <Image
                    source={require('../assets/vipLogo.png')}
                    style={[resizeModeContain, {width: wp(13), height: wp(13)}]}
                  />
                </View>
                <View style={{width: '75%'}}>
                  <Text
                    style={[
                      styles.productPrice,
                      {padding: spacings.small, color: blackColor},
                    ]}>
                    Donald Rice
                  </Text>
                  <View
                    style={[
                      {
                        width: wp(30),
                        height: hp(3),
                        paddingLeft: spacings.large,
                      },
                      justifyContentSpaceBetween,
                      flexDirectionRow,
                    ]}>
                    <FontAwesome name="star" size={17} color={goldColor} />
                    <FontAwesome name="star" size={17} color={goldColor} />
                    <FontAwesome name="star" size={17} color={goldColor} />
                    <FontAwesome name="star" size={17} color={goldColor} />
                    <FontAwesome name="star-o" size={17} color={goldColor} />
                  </View>
                  <Text
                    style={[
                      styles.productDescription,
                      {
                        fontSize: style.fontSizeSmall1x.fontSize,
                        color: blackColor,
                      },
                    ]}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed ...
                  </Text>
                </View>
              </View>
              <Pressable
                style={[
                  styles.outOfStockButton,
                  borderRadius10,
                  {marginVertical: 20},
                ]}
                onPress={() =>
                  navigation.navigate('ReviewScreen', {
                    product: product,
                  })
                }>
                <Text style={[styles.addToCartButtonText, textAlign]}>
                  View All Reviews
                </Text>
              </Pressable>
              <Text
                style={[
                  styles.relatedProductsTitle,
                  {color: blackColor, marginBottom: 20},
                ]}>
                Seller
              </Text>

              <View style={[flexDirectionRow, alignItemsCenter]}>
                <View
                  style={[{width: wp(20), height: hp(10)}, alignItemsCenter]}>
                  <Image
                    source={require('../assets/vipLogo.png')}
                    style={[resizeModeContain, {width: wp(13), height: wp(13)}]}
                  />
                </View>
                <View style={{width: '75%'}}>
                  <Text
                    style={[
                      styles.productPrice,
                      {padding: spacings.small, color: blackColor},
                    ]}>
                    David Smith
                  </Text>

                  <Text
                    style={[
                      styles.productDescription,
                      {
                        fontSize: style.fontSizeSmall1x.fontSize,
                        color: blackColor,
                      },
                    ]}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed ...
                  </Text>
                </View>
              </View>
              <Pressable
                style={[
                  styles.outOfStockButton,
                  borderRadius10,
                  {marginVertical: 20},
                ]}
                onPress={() =>
                  navigation.navigate('SellerProfile', {
                    product: product,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.addToCartButtonText, textAlign]}>
                    View Profile
                  </Text>
                  <EvilIcons
                    name="external-link"
                    size={27}
                    color={whiteColor}
                    style={{marginTop: 0}}
                  />
                </View>
              </Pressable>

              {/* Recommended videos section */}
              <View style={{marginVertical: 10, marginLeft: 10}}>
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
                {/* </View> */}
                <FlatList
                  data={recommendedVideos}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderItem1}
                  keyExtractor={item => item.video_id}
                  onViewableItemsChanged={onViewableItemsChanged1}
                  viewabilityConfig={viewabilityConfig1}
                  // getItemLayout={(data, index) => (
                  //   { length: width, offset: width * index, index }
                  // )}
                />
              </View>

              {/* //You Might Like Section */}
              <Text
                style={[
                  styles.relatedProductsTitle,
                  {color: blackColor, marginVertical: 14},
                ]}>
                {'You Might Like'}
              </Text>

              <View style={[styles.detailsBox]}>
                <FlatList
                  data={recommendedVideos}
                  keyExtractor={item => item?.id?.toString()}
                  numColumns={2}
                  renderItem={({item, index}) => {
                    const isPlaying =
                      visibleVideoIndicesSaved[playingIndexSaved] === index;
                    const itemPrice = '$200';
                    const imageUrl = item?.video_url;
                    return (
                      <View style={[styles.itemContainer]}>
                        <Pressable
                          style={[
                            positionAbsolute,
                            alignJustifyCenter,
                            styles.favButton,
                            {
                              backgroundColor: 'white',
                              borderRadius: 100,
                              padding: 4,
                            },
                          ]}
                          onPress={() => handlePress(item)}>
                          <AntDesign
                            name={'heart'}
                            size={18}
                            color={redColor}
                          />
                        </Pressable>

                        <Pressable
                          style={[
                            positionAbsolute,
                            alignJustifyCenter,
                            styles.favButton1,
                          ]}
                          onPress={() => handlePress(item)}>
                          <Image
                            source={REEL_PLAY_WHITE}
                            style={{
                              width: 25,
                              height: 25,
                            }}
                          />
                        </Pressable>
                        {/* <Image
                        source={{ uri: imageUrl }}
                        style={[styles.productImage ]}
                      /> */}

                        {/* <View style={{ width: 150, borderRadius: 10 }}> */}
                        <TouchableOpacity
                          style={{
                            width: 170,
                            height: hp(20),
                            borderRadius: 10,
                            overflow: 'hidden',
                          }}>
                          <Video
                            bufferConfig={{
                              minBufferMs: 2000,
                              maxBufferMs: 5000,
                              bufferForPlaybackMs: 1000,
                              bufferForPlaybackAfterRebufferMs: 1500,
                            }}
                            // poster={item?.thumb_url}
                            // posterResizeMode={'cover'}
                            source={{uri: convertToProxyURL(imageUrl)}}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            muted
                            resizeMode="cover"
                            repeat={true}
                            maxBitRate={2000000}
                            paused={!isPlaying}
                            hideShutterView={true}
                            onBuffer={e => {
                              if (e.isBuffering == true) {
                                // setLoading(true);
                              } else {
                                // setLoading(false);
                              }
                            }}
                          />
                        </TouchableOpacity>
                        {/* </View> */}

                        <View
                          style={{
                            width: '100%',
                            height: hp(7),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={[
                              styles.wishListItemName,
                              {color: blackColor},
                            ]}>
                            {item?.title}
                          </Text>
                          {/* <Text style={[styles.wishListItemPrice]}>{itemCurrencyCode}</Text> */}
                        </View>
                        <View
                          style={[
                            {
                              width: '100%',
                              flexDirection: 'row',
                              paddingTop: 1,
                              justifyContent: 'space-between',
                            },
                          ]}>
                          {itemPrice && (
                            <View style={{paddingTop: 8}}>
                              <Text
                                style={[
                                  styles.wishListItemPrice,
                                  {color: blackColor},
                                ]}>
                                {itemPrice}{' '}
                              </Text>
                            </View>
                          )}
                          <TouchableOpacity style={styles.buyButton}>
                            <Text style={{color: '#fff', alignSelf: 'center'}}>
                              Buy Now
                            </Text>
                          </TouchableOpacity>
                          {/* {inventoryQuantity <= 0 ? <Pressable
                          style={[styles.addtocartButton, borderRadius10, alignJustifyCenter]}
                        >
                          <Text style={styles.addToCartButtonText}>Out of stock</Text>
                        </Pressable>
                          : <Pressable
                            style={[styles.addtocartButton, borderRadius10, alignJustifyCenter]}
                            onPress={() => addToCartProduct(item, 1)}
                          >
                            {loadingProductId === variantId ? <ActivityIndicator size="small" color={whiteColor} /> :
                              <Text style={styles.addToCartButtonText}>Add To Cart</Text>}
                          </Pressable>} */}
                        </View>
                      </View>
                    );
                  }}
                  onViewableItemsChanged={onViewableItemsChanged}
                  contentContainerStyle={{paddingBottom: 100}}
                  viewabilityConfig={viewabilityConfig}
                />
              </View>
              {/* <TouchableOpacity style={[styles.button, alignItemsCenter, borderRadius5]} onPress={onPreesViewReviewAll}>
                <Text style={styles.buttonText}>{VIEW_ALL_REVIEWS}</Text>
              </TouchableOpacity> */}
            </View>
            {/* <View style={[{ width: wp(95), height: hp(8), marginVertical: spacings.normal }, flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
              <View>
                <Text style={{ paddingVertical: spacings.small, color: redColor, fontSize: style.fontSizeLarge.fontSize }}>{PRICE}:</Text>
                <Text style={styles.productPrice}>{(variant?.price?.amount) ? (variant?.price?.amount) : (variant?.price)} {variant?.price?.currencyCode}</Text>
              </View>
              <TouchableOpacity style={[alignJustifyCenter, styles.shareButton]} onPress={shareProduct}>
                <FontAwesome name="share" size={25} color={blackColor} />
              </TouchableOpacity>
            </View> */}
          </View>
          {/* {relatedProducts?.length != 0 && (
            <View style={styles.relatedProductsContainer}>
              <Text
                style={[
                  styles.relatedProductsTitle,
                  {color: blackColor},
                ]}>
                {YOU_MIGHT_LIKE}
              </Text>
              {/* <FlatList
                data={relatedProducts}
                renderItem={({item}) => {
                  const inventoryQuantity =
                    item?.variants[0]?.inventory_quantity ?? 0;
                  const isFavSelected = getIsFavSelected(
                    item.admin_graphql_api_id,
                  );
                  return (
                    <View
                      style={[
                        styles.relatedProductItem,
                        alignJustifyCenter,
                        {
                          backgroundColor: isDarkMode
                            ? grayColor
                            : 'transparnet',
                        },
                      ]}>
                      <View
                        style={{
                          width: '100%',
                          borderWidth: 0.5,
                          borderColor: lightGrayOpacityColor,
                          marginBottom: spacings.small,
                          borderRadius: 10,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.image?.src}}
                          style={[
                            styles.relatedProductImage,
                            borderRadius10,
                            resizeModeContain,
                          ]}
                        />
                      </View>
                      <View style={[{width: '100%', height: hp(10)}]}>
                        <Text
                          style={[
                            styles.relatedproductName,
                            {color: blackColor},
                          ]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.relatedproductPrice,
                            {
                              paddingHorizontal: spacings.small,
                              color: blackColor,
                            },
                          ]}>
                          {item?.variants[0]?.price}
                          {shopCurrency}
                        </Text>
                      </View>
                      <View
                        style={[
                          {width: '100%', flexDirection: 'row'},
                          justifyContentSpaceBetween,
                          alignItemsCenter,
                        ]}>
                        {inventoryQuantity === 0 ? (
                          <Pressable
                            style={[
                              styles.relatedAddtocartButton,
                              borderRadius10,
                              alignJustifyCenter,
                            ]}>
                            <Text style={styles.addToCartButtonText}>
                              Out of stock
                            </Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            style={[
                              styles.relatedAddtocartButton,
                              borderRadius10,
                              alignJustifyCenter,
                            ]}
                            onPress={() =>
                              onAddToCartRelatedProduct(
                                item.variants[0].admin_graphql_api_id,
                                1,
                              )
                            }
                            disabled={
                              loadingProductId ===
                              item.variants[0].admin_graphql_api_id
                            }>
                            {loadingProductId ===
                            item.variants[0].admin_graphql_api_id ? (
                              <ActivityIndicator color={whiteColor} />
                            ) : (
                              <Text style={styles.addToCartButtonText}>
                                Add to Cart
                              </Text>
                            )}
                          </Pressable>
                        )}
                        <TouchableOpacity
                          style={[
                            alignJustifyCenter,
                            styles.relatedProductfavButton,
                            {
                              backgroundColor: whiteColor,
                              borderColor: redColor,
                            },
                          ]}
                          onPress={() => handlePress(item)}>
                          <AntDesign
                            name={isFavSelected ? 'heart' : 'hearto'}
                            size={18}
                            color={redColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                horizontal
                // numColumns={2}
                keyExtractor={index => index?.toString()}
                showsHorizontalScrollIndicator={false}
              /> */}
          {/* </View> */}
          {/* )}  */}
          {/* {shareProductloading && (
            <LoadingModal visible={shareProductloading} />
          )} */}
        </View>
      </ScrollView>
      <View
        style={[
          flexDirectionRow,
          justifyContentSpaceBetween,
          positionAbsolute,
          alignItemsCenter,
          {
            bottom: 0,
            width: wp(100),
            height: hp(10),
            zIndex: 1,
            backgroundColor: whiteColor,
          },
        ]}>
        {/* {getInventoryQuantity() > 0 && (
          <View>
            <Text
              style={{
                padding: spacings.large,
                color: redColor,
                fontSize: style.fontSizeLarge.fontSize,
              }}>
              {QUNATITY}:
            </Text>
            <View
              style={[
                styles.quantityContainer,
                flexDirectionRow,
                alignJustifyCenter,
              ]}>
              <TouchableOpacity onPress={decrementQuantity}>
                <Text
                  style={[
                    styles.quantityButton,
                    borderRadius5,
                    textAlign,
                    {
                      color: blackColor,
                      borderColor: blackColor,
                    },
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={[styles.quantity, {color: blackColor}]}>
                {quantity}
              </Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <Text
                  style={[
                    styles.quantityButton,
                    borderRadius5,
                    textAlign,
                    {
                      color: blackColor,
                      borderColor: blackColor,
                    },
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}
        <View style={styles.addToCartButtonContainer}>
          <Pressable
            // disabled={loading || !variantSelected}
            style={[
              styles.addToCartButton,
              borderRadius10,
              {
                width: wp(45),
                marginRight: 20,
                backgroundColor: '#fff',
                borderColor: redColor,
                borderWidth: 1,
              },
            ]}
            //   onPress={() => onAddToCart(product.variants[0].variantId, quantity)}
          >
            {loading ? (
              <View style={[styles.addToCartButtonLoading, textAlign]}>
                <ActivityIndicator size="small" color={redColor} />
              </View>
            ) : (
              <Text
                style={[
                  styles.addToCartButtonLoading,
                  textAlign,
                  {color: redColor},
                ]}>
                Add to cart
              </Text>
            )}
          </Pressable>
          <Pressable
            // disabled={loading || !variantSelected}
            style={[styles.addToCartButton, borderRadius10, {width: wp(45)}]}
            // onPress={() => variant?.id && onAddToCart(variant.id, quantity)}
          >
            {loading ? (
              <View style={[styles.addToCartButtonLoading, textAlign]}>
                <ActivityIndicator size="small" color={whiteColor} />
              </View>
            ) : (
              <Text
                style={[
                  styles.addToCartButtonLoading,
                  textAlign,
                  {color: whiteColor},
                ]}>
                Buy Now
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    maxHeight: hp(100),
  },
  productItem: {
    padding: spacings.large,
  },
  productText: {
    paddingTop: spacings.large,
    flexShrink: 1,
    flexGrow: 1,
    color: '#0000',
  },
  productTitle: {
    fontSize: style.fontSizeLarge.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    marginTop: spacings.large,
    marginBottom: spacings.normal,
    marginHorizontal: spacings.normal,
    lineHeight: 28,
    textAlign: 'left',
    color: blackColor,
  },
  productDescription: {
    fontSize: style.fontSizeNormal.fontSize,
    fontWeight: '400',
    marginHorizontal: spacings.normal,
    lineHeight: 15,
    textAlign: 'left',
    color: '#0000',
  },
  productPrice: {
    fontSize: style.fontSizeLarge.fontSize,
    color: blackColor,
    fontWeight: style.fontWeightThin1x.fontWeight,
    marginLeft: spacings.small,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addToCartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  addToCartButton: {
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    backgroundColor: redColor,
    padding: spacings.xxLarge,
  }, 
  outOfStockButton: {
    width: wp(60),
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    backgroundColor: redColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    fontSize: style.fontSizeNormal.fontSize,
    lineHeight: 20,
    color: whiteColor,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  quantityContainer: {
    marginBottom: spacings.large,
    paddingHorizontal: spacings.normal,
    width: wp(28),
  },
  quantityButton: {
    width: wp(7),
    color: blackColor,
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    borderWidth: 1,
  },
  quantity: {
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.xsmall,
    fontSize: style.fontSizeNormal2x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  addToCartButtonLoading: {},
  shareButton: {
    width: wp(10),
    height: wp(10),
    zIndex: 10,
    borderRadius: 100,
  },
  relatedProductsContainer: {
    width: '100%',
    marginTop: spacings.xLarge,
  },
  relatedProductsTitle: {
    fontSize: style.fontSizeLarge.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
  },
  relatedProductItem: {
    width: wp(40),
    marginVertical: spacings.small,
    padding: spacings.large,
    borderRadius: 5,
  },
  relatedProductImage: {
    width: wp(30),
    height: wp(30),
    marginVertical: spacings.large,
  },
  relatedProductTitle: {
    fontSize: style.fontSizeNormal.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  relatedAddtocartButton: {
    fontSize: style.fontSizeExtraExtraSmall.fontSize,
    width: '68%',
    backgroundColor: redColor,
    padding: spacings.normal,
  },
  optionContainer: {
    marginVertical: spacings.small,
  },
  optionName: {
    fontSize: style.fontSizeNormal.fontSize,
    color: blackColor,
    fontWeight: style.fontWeightThin1x.fontWeight,
    marginBottom: spacings.xsmall,
  },
  optionValueContainer: {
    marginHorizontal: spacings.large,
    padding: spacings.small,
    borderWidth: 1,
    borderColor: blackColor,
    width: wp(23),
  },
  optionValue: {
    fontSize: style.fontSizeNormal.fontSize,
    color: blackColor,
  },
  favButton: {
    width: wp(8),
    height: wp(8),
    left: 20,
    top: 20,
    zIndex: 10,
    backgroundColor: whiteColor,
    borderRadius: 100,
  },
  reviewSection: {
    width: '100%',
    height: hp(6),
  },
  button: {
    width: '100%',
    backgroundColor: redColor,
    paddingVertical: spacings.large,
    marginTop: spacings.large,
  },
  buttonText: {
    color: whiteColor,
    fontSize: style.fontSizeMedium.fontSize,
    fontWeight: style.fontWeightThin.fontWeight,
  },
  relatedProductfavButton: {
    width: wp(10),
    height: hp(3.8),
    right: 0,
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  relatedproductName: {
    fontSize: style.fontSizeNormal.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
  relatedproductPrice: {
    fontSize: style.fontSizeSmall1x.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    fontFamily: 'GeneralSans-Variable',
  },
  wishListItemName: {
    color: blackColor,
    fontSize: 14,
  },
  wishListItemPrice: {
    fontSize: 18,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
    fontFamily: 'GeneralSans-Variable',
  },
  buyButton: {
    height: 30,
    width: 75,
    backgroundColor: redColor,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  },
  favButton1: {
    width: wp(8),
    height: wp(8),
    right: 15,
    top: 15,
    zIndex: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: spacings.large,
    width: wp(48),
    borderWidth: 0.1,
  },
  detailsBox: {
    width: wp(100),
    height: hp(87),
  },
});
