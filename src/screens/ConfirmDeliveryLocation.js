import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {spacings, style} from '../constants/Fonts';
import {blackColor, redColor} from '../constants/Color';
import AddAddressModal from '../components/Modal/AddAddressModal';

const ConfirmDeliveryLocation = ({navigation}) => {
  const [address, setAddress] = useState(
    '49 Featherstone Street, LONDON EC1Y 8SY',
  );
  const [modalVisible, setModalVisible] = useState(false);
  const onPressAddAddress = () => {
    setModalVisible(true);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm delivery location</Text>
      </View>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={redColor} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for area, street name..."
        />
      </View>
      {/* Address Section */}
      <Text style={styles.sectionTitle}>DELIVERING YOUR ORDER TO</Text>
      <View style={styles.addressContainer}>
        <Ionicons name="location" size={24} color={redColor} />
        <View style={styles.addressTextContainer}>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.city}>London</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.changeText}>CHANGE</Text>
        </TouchableOpacity>
      </View>

      {/* Ads Section */}
      <Text style={styles.adsTitle}>Ads</Text>
      <View style={styles.adsContainer}>
        <Image
          source={require('../assets/vipPoster.png')} // Replace with correct ad image path
          style={styles.adImage}
        />
        <Image
          source={require('../assets/vipPoster.png')} // Replace with correct ad image path
          style={styles.adImage}
        />
      </View>

      {/* Add More Address Button */}
      <TouchableOpacity style={styles.addButton} onPress={onPressAddAddress}>
        <Text style={styles.addButtonText}>Add more address details</Text>
      </TouchableOpacity>

      {modalVisible && (
        <AddAddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: style.fontSizeMedium1x.fontSize,
    fontWeight: style.fontWeightMedium.fontWeight,
    color: blackColor,
    marginLeft: spacings.normalx,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    color: '#39A937',
    fontWeight: '500',
    marginBottom: 8,
  },
  addressContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  address: {
    fontWeight: '500',
    fontSize: 16,
  },
  city: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  changeText: {
    color: redColor,
    fontWeight: 'bold',
  },
  adsTitle: {
    marginTop: 40,
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
  },
  adsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  adImage: {
    width: '48%',
    height: 100,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    width: '100%',
    left: '5%',
    bottom: 10,
    backgroundColor: redColor,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmDeliveryLocation;
