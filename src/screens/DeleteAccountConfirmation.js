import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {redColor} from '../constants/Color';

const DeleteAccountConfirmation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>
        You have requested the deletion of your account
      </Text>

      <Text style={styles.description}>
        When you find a product you want to purchase, tap on it to view the
        product details. Check the price, description, and available options (if
        applicable), and then tap the "Add to Cart" button. Follow the on-screen
        instructions to complete the purchase, including providing shipping
        details and payment information.
      </Text>
      {/* <Text>When you find a product you want to purchase, tap on it to view the product details .Check the price  </Text> */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete my account now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backToSettings}>
        <Text style={styles.backToSettingsText}>Back to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  deleteButton: {
    backgroundColor: redColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToSettings: {
    alignItems: 'center',
  },
  backToSettingsText: {
    color: redColor,
    fontSize: 16,
  },
});

export default DeleteAccountConfirmation;
