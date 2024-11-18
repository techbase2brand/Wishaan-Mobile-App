import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import {redColor, blackColor, grayColor, whiteColor} from '../constants/Color';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {spacings, style} from '../constants/Fonts';
import {BaseStyle} from '../constants/Style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {
  BELL_ICON,
  MAIN_ICON,
  MENU_ICON,
  SAVED_ICON,
  SEARCH_ICON,
} from '../assets/Image';
const {
  alignItemsCenter,
  alignJustifyCenter,
  flexDirectionRow,
  flex,
  positionRelative,
  positionAbsolute,
  justifyContentSpaceBetween,
} = BaseStyle;
const totalQuantity = 4;
const Header = ({
  navigation,
  backIcon,
  text,
  onPress,
  textinput,
  notification,
  saved,
  mainIcon,
  closeIcon,
  menuImage,
  onClosePress,
  marginleft,
  shoppingCart,
  onPressShopByCatagory,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleSaved = () => {
    navigation.navigate('Saved');
    setModalVisible(false);
  };
  const OnClickBackIcon = () => {
    navigation.goBack();
  };
  const OnClickCartIcon = () => {
    navigation.navigate('NotificationScreen');
  };
  const OnClickSearchBar = () => {
    navigation.navigate('Search', {navigation: navigation});
  };
  const OnClickClose = () => {
    onClosePress();
  };
  const trimcateText = text => {
    const words = text.split(' ');
    if (words.length > 3) {
      return words?.slice(0, 3).join(' ') + '...';
    }
    return text;
  };
  return (
    <View>
      <View
        style={[
          flexDirectionRow,
          alignJustifyCenter,
          justifyContentSpaceBetween,
          {height: hp(6), width: '99%'},
        ]}>
        <View style={[flexDirectionRow, alignItemsCenter]}>
          {backIcon && (
            <TouchableOpacity
              style={[alignJustifyCenter, {width: wp(10)}]}
              onPress={OnClickBackIcon}>
              <Ionicons name={'arrow-back'} size={25} color={blackColor} />
            </TouchableOpacity>
          )}
          {closeIcon && (
            <TouchableOpacity
              style={[alignJustifyCenter, {width: wp(10)}]}
              onPress={OnClickClose}>
              <Ionicons name={'close'} size={35} color={blackColor} />
            </TouchableOpacity>
          )}
          {menuImage && (
            <TouchableOpacity
              style={[alignJustifyCenter, {}]}
              onPress={() => setModalVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Image
                  source={require('../assets/LoginLogo.png')}
                  style={{
                    width: wp(24),
                    height: hp(6),
                    resizeMode: 'contain',
                    marginLeft: spacings.large,
                  }}
                />
                {/* <Text style={styles.logoText}>Wishaan</Text> */}
                <Entypo
                  name={'chevron-small-down'}
                  size={24}
                  color={blackColor}
                  style={{marginTop: 8}}
                />
              </View>

              {/* <Image
                source={MENU_ICON}
                style={{
                  width: wp(8),
                  height: hp(5),
                  resizeMode: 'contain',
                  marginLeft: spacings.large,
                }}
              /> */}
            </TouchableOpacity>
          )}
          {text && (
            <Text
              style={[
                styles.text,
                {
                  color: blackColor,
                  textAlign: 'right',
                  width:
                    text == 'My Cart' ||
                    text == 'Account' ||
                    text == 'Details' ||
                    text == 'Search'
                      ? wp(46)
                      : wp(51),
                  marginLeft: marginleft ? marginleft : 0,
                },
              ]}>
              {text}
            </Text>
          )}
        </View>

        {/* {mainIcon && (
          <Image
            source={MAIN_ICON}
            style={{
              width: wp(20),
              height: hp(2.5),
              resizeMode: 'contain',
              marginLeft: 40,
            }}
          />
        )} */}
        <View
          style={[
            flexDirectionRow,
            {width: 'auto'},
            justifyContentSpaceBetween,
            alignItemsCenter,
          ]}>
          {textinput && (
            <TouchableOpacity
              style={[alignJustifyCenter, {width: wp(10)}]}
              onPress={OnClickSearchBar}>
              <Image
                source={SEARCH_ICON}
                style={{
                  width: wp(6),
                  height: hp(3),
                  resizeMode: 'contain',
                  marginLeft: spacings.large,
                }}
              />
            </TouchableOpacity>
          )}
          {saved && (
            <View>
              <TouchableOpacity
                style={[alignJustifyCenter, {width: wp(10)}]}
                onPress={() => navigation.navigate('Saved')}>
                <AntDesign
                  // onPress={handlePress}
                  name={'hearto'}
                  size={24}
                  color={'black'}
                  style={styles.icon}
                />
                {/* <Image
                  source={SAVED_ICON}
                  style={{
                    width: wp(8),
                    height: hp(3.3),
                    resizeMode: 'contain',
                    marginLeft: spacings.large,
                  }}
                /> */}
              </TouchableOpacity>
              {totalQuantity > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{'6'}</Text>
                </View>
              )}
            </View>
          )}
          {notification && (
            <View>
              <TouchableOpacity
                style={[alignJustifyCenter, {width: wp(10)}]}
                onPress={OnClickCartIcon}>
                <Image
                  source={BELL_ICON}
                  style={{
                    width: wp(8),
                    height: hp(3.3),
                    resizeMode: 'contain',
                    marginLeft: spacings.large,
                  }}
                />
              </TouchableOpacity>
              {totalQuantity > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      {/* Modal with Edit and Delete options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <Pressable style={styles.overlay} onPress={handleCloseModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={[
                styles.modalOption,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}
              onPress={() => console.log('Edit clicked')}>
              <Text style={styles.optionText}>Shop by categories</Text>
              {/* <Entypo name={'chevron-right'} size={24} color={blackColor} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}
              onPress={handleSaved}>
              <Text style={styles.optionText}>Saved</Text>
              {/* <Entypo name={'chevron-right'} ssize={24} color={blackColor} /> */}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* {modalVisible && <MenuModal
        modalVisible={modalVisible} setModalVisible={setModalVisible} onPressCart={OnClickCartIcon} onPressSearch={OnClickSearchBar} navigation={navigation} onPressShopByCatagory={onPressShopByCatagory} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: style.fontSizeMedium1x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
    marginLeft: spacings.normalx,
  },
  logoText: {
    fontFamily: Platform.OS === 'ios' ? 'Billabong-iOS' : 'Billabong-Android',
    // fontFamily: 'Billabong', // Use 'Billabong' for Instagram logo-like font or any cursive font available
    fontSize: 14,
    color: 'black',
    marginLeft: spacings.normalx,
  },
  input: {
    width: '100%',
    height: hp(6),
    borderColor: 'transparent',
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: spacings.large,
    marginTop: spacings.large,
    shadowColor: grayColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1.5,
  },
  suggestionBox: {
    top: hp(7.1),
    left: 0,
    right: 0,
    backgroundColor: whiteColor,
    zIndex: 1,
    width: wp(95),
    height: 'auto',
  },
  itembox: {
    width: wp(100),
    height: hp(14),
    top: hp(8),
    left: 0,
    right: 0,
    backgroundColor: whiteColor,
    zIndex: 1,
    padding: spacings.large,
  },
  suggestionItem: {
    padding: spacings.large,
    width: wp(100),
    height: hp(5),
    zIndex: 1,
  },
  textinputBox: {
    width: '93%',
    height: hp(6),
    borderColor: 'transparent',
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: spacings.large,
    marginTop: spacings.small,
    shadowColor: grayColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1.5,
    alignSelf: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: 2,
    backgroundColor: redColor, // Your preferred badge color
    borderRadius: wp(2), // Adjust based on the size of your badge
    width: wp(4), // Adjust based on the size of your badge
    height: wp(4), // Adjust based on the size of your badge
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: whiteColor,
    fontSize: wp(2.5), // Adjust based on the size of your badge
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 10,
    top: '13%',
    paddingVertical: 10,
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    // textAlign: 'center',
  },
});

export default Header;
