import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Share,
} from 'react-native';
import {redColor} from '../constants/Color';
import Header from '../components/Header';

const ReferralScreen = ({navigation}) => {
  const [referralCode] = useState('ABC1234'); // Example referral code
  const [earnings, setEarnings] = useState([
    {id: '1', date: '2024-11-01', amount: '$10'},
    {id: '2', date: '2024-11-03', amount: '$15'},
  ]);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Join and earn! Use my referral code ${referralCode} to sign up and get rewards!`,
      });
    } catch (error) {
      console.log('Error sharing referral link:', error.message);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.earningsItem}>
      <Text style={styles.dateText}>{item?.date}</Text>
      <Text style={styles.amountText}>{item?.amount}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        backIcon={true}
        text={'Referral & Earn'}
        navigation={navigation}
      />
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>Referral & Earn</Text> */}
        <Text style={styles.codeText}>Your Referral Link: {referralCode}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareButtonText}>Share Link</Text>
        </TouchableOpacity>

        <Text style={styles.earningsHeader}>Referral Earnings</Text>
        <FlatList
          data={earnings}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codeText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  shareButton: {
    backgroundColor: redColor,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  earningsHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
  },
  earningsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ReferralScreen;
