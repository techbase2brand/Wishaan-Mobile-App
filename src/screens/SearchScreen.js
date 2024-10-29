import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './../utils';
import {
  blackColor,
  grayColor,
  whiteColor,
  lightGrayOpacityColor,
  mediumGray,
} from '../constants/Color';
import {
  STOREFRONT_DOMAIN,
  SEARCH_FOR_CLOTHES,
  ADMINAPI_ACCESS_TOKEN,
  ELECTRONIC_BEST_DEALS_OF_THE_WEEK_COLLECTION_ID,
  ELECTRONIC_POPULAR_PRODUCT_COLLECTION_ID,
  POPULAR_LIQUOR,
  POPULAR_PRODUCT_COLLECTION_ID,
  AUTOMOTIVE_POPULAR_PRODUCT_COLLECTION_ID,
  BEST_DEALS_OF_THE_WEEK_COLLECTION_ID,
  DRINK_POPULAR_PRODUCT_COLLECTION_ID,
  DRINK_BEST_DEALS_OF_THE_WEEK_COLLECTION_ID,
  // ,BEAUTY_POPULAR_PRODUCT_COLLECTION_ID,BEAUTY_BEST_DEALS_OF_THE_WEEK_COLLECTION_ID,CLOTHING_BEST_DEALS_OF_THE_WEEK_COLLECTION_ID,CLOTHING_POPULAR_PRODUCT_COLLECTION_ID
} from '../constants/Constants';
import {BaseStyle} from '../constants/Style';
import {spacings, style} from '../constants/Fonts';
import {logEvent} from '@amplitude/analytics-react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import Header from '../components/Header';
// import { BACKGROUND_IMAGE } from '../assests/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {
  alignItemsCenter,
  alignJustifyCenter,
  flexDirectionRow,
  flex,
  positionRelative,
  positionAbsolute,
  resizeModeContain,
  borderRadius5,
  justifyContentSpaceBetween,
} = BaseStyle;
const SearchScreen = ({navigation}) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [inventoryQuantities, setInventoryQuantities] = useState('');
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);
  const [productVariantsIDS, setProductVariantsIDS] = useState([]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSearch = async () => {
    console.log(searchQuery);
  };

  const fillTextInputWithHint = (hint ,id) => {
    setSearchQuery(hint);
    setShowSuggestions(false);
    setSuggestionClicked(true);
    navigation.navigate('SearchResultScreen', {
      title: hint,
      id: id,
    });
    setSearchQuery('');
  };
  const handleSearchSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setRecentSearches(prev => {
        // Avoid duplicate entries
        if (!prev.includes(trimmedQuery)) {
          return [trimmedQuery, ...prev];
        }
        return prev;
      });
      setSearchQuery('');
      Keyboard.dismiss(); // Dismiss the keyboard after search
    }
  };

  const handleRemoveSearch = item => {
    setRecentSearches(prev => prev.filter(search => search !== item));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };
  return (
    <KeyboardAvoidingView
      style={[flex, {height: hp(100)}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.Container, flex, {backgroundColor: whiteColor}]}>
        <Header backIcon={true} text={'Search'} navigation={navigation} />
        <View style={{paddingHorizontal: spacings.large}}>
          <View style={[positionRelative]}>
            <View
              style={[
                styles.input,
                flexDirectionRow,
                alignItemsCenter,
                {backgroundColor: whiteColor, shadowColor: grayColor},
              ]}>
              <Ionicons
                name="search"
                size={25}
                color={ grayColor}
              />
              <View style={[flex]}>
                <TextInput
                  placeholder={SEARCH_FOR_CLOTHES}
                  placeholderTextColor={grayColor}
                  style={{color: blackColor}}
                  value={searchQuery}
                  onChangeText={async text => {
                    setSearchQuery(text);
                  }}
                  onSubmitEditing={handleSearchSubmit}
                />
              </View>

              {showSuggestions && (
                <Pressable
                  style={[
                    positionAbsolute,
                    styles.suggestionBox,
                    {backgroundColor: whiteColor},
                  ]}
                  onPress={dismissKeyboard}>
                  {searchSuggestions.length != 0 ? (
                    <FlatList
                      data={searchSuggestions}
                      renderItem={({item, index}) => {
                        console.log('showSuggestionsitem', item);

                        return (
                          <TouchableOpacity
                          // onPress={async () => {
                          //   setSearchQuery(item?.title);
                          //   await handleSearch();
                          //   setShowSuggestions(false);
                          //   setSuggestionClicked(true);
                          //   const selectedItemFromResults =
                          //     searchResults.find(
                          //       items =>
                          //         items?.node?.title === item?.title &&
                          //         items?.node?.images?.edges[0]?.node?.src ===
                          //           item?.imageSrc,
                          //     );
                          //   console.log(
                          //     'selectedItemFromResults',
                          //     selectedItemFromResults,
                          //   );

                          //   navigation.navigate('ProductDetails', {
                          //     product: item,
                          //     variant: getVariant(
                          //       selectedItemFromResults?.node,
                          //     ),
                          //     inventoryQuantity: inventoryQuantities[index],
                          //     tags: tags[index],
                          //     option: options[index],
                          //     ids: productVariantsIDS[index],
                          //   });
                          //   setSearchQuery('');
                          //   logEvent(`Search Prodcut ${item.title}`);
                          // }}
                          // style={[
                          //   styles.suggestionItem,
                          //   flexDirectionRow,
                          //   alignItemsCenter,
                          // ]}
                          >
                            <Image
                              source={{uri: item?.imageSrc}}
                              style={[
                                {
                                  width: wp(13),
                                  height: hp(10),
                                  marginRight: spacings.large,
                                },
                                resizeModeContain,
                              ]}
                            />
                            <View style={{width: wp(55)}}>
                              <Text style={{color: blackColor}}>
                                {item?.title}
                              </Text>
                              <Text style={{color: mediumGray}}>
                                {item?.price}{' '}
                              </Text>
                            </View>
                            <View style={[{width: '25%'}, alignJustifyCenter]}>
                              <Feather
                                name="arrow-up-right"
                                size={25}
                                color={blackColor}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <View
                      style={[
                        alignJustifyCenter,
                        {width: wp(80), height: hp(79), alignSelf: 'center'},
                      ]}>
                      <View>
                        <Ionicons name="search" size={50} color={grayColor} />
                      </View>
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: style.fontSizeLarge.fontSize,
                        }}>
                        No Results Found!
                      </Text>
                      <Text style={{color: mediumGray, textAlign: 'center'}}>
                        Try a similar word or something more general.
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
            </View>

            {recentSearches?.length > 0 && (
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={handleClearAll}>
                  <Text style={styles.clearAllText}>Clear all</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={recentSearches}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <View style={styles.recentItem}>
                  <Text>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveSearch(item)}>
                    <AntDesign name="closecircleo" size={20} color="#888" />
                  </TouchableOpacity>
                </View>
              )}
              // // ListEmptyComponent={<View style={{ marginTop: 100 }}
              // >
              //   <Ionicons name="search" size={45} color={isDarkMode ? whiteColor : grayColor} style={{ alignSelf: "center" }} />
              //   <Text style={[styles.recentTitle, { alignSelf: "center", marginVertical: 5, }]}>No Results Found!</Text>
              //   <Text style={[styles.emptyText, { width: wp(60), alignSelf: "center" }]}>Try a similar word or something more general.</Text>
              // </View>}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: hp(100),
  },
  text: {
    fontSize: style.fontSizeLarge.fontSize,
    fontWeight: style.fontWeightThin1x.fontWeight,
    color: blackColor,
  },
  hintText: {
    padding: spacings.large,
    color: grayColor,
    fontSize: style.fontSizeNormal2x.fontSize,
  },
  input: {
    width: '100%',
    height: hp(6),
    borderColor: 'transparent',
    // backgroundColor: whiteColor,
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: spacings.large,
    marginTop: spacings.large,
    // shadowColor: grayColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1.5,
  },
  suggestionBox: {
    top: hp(7.5),
    left: 0,
    right: 0,
    backgroundColor: whiteColor,
    zIndex: 1,
    width: wp(95),
    height: hp(83),
    borderRadius: 2,
  },

  suggestionItem: {
    padding: spacings.large,
    width: wp(100),
    height: hp(10),
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearAllText: {
    color: 'red',
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 0,
  },
});

export default SearchScreen;
