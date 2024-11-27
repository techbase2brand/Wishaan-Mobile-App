import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {redColor} from '../constants/Color';
import Header from '../components/Header';

const ConfirmReportIssues = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Header
        backIcon={true}
        navigation={navigation}
        marginleft={14}
        text={'Report & Issue'}
      />
      <Text style={{textAlign: 'center', marginVertical: 20, fontSize: 18}}>
        What issue are you facing?
      </Text>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={[styles.section]}
        onPress={() => navigation.navigate('ReportIssueScreen')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>I want to manage my order </Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ReportIssueScreen')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>
            I want help with returns & refunds
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ReportIssueScreen')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>I want help with other issues</Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ReportIssueScreen')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>App issues</Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ReportIssueScreen')}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>other</Text>
        </View>
        <Icon name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.sectionDivider} />

      {/* Ads Section */}
      <Text style={styles.adsTitle}>Ads</Text>
      <View style={styles.adContainer}>
        <Image
          source={require('../assets/vipPoster.png')}
          style={styles.adImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: redColor,
    marginLeft: 24,
    marginTop: 100,
  },
  adContainer: {
    marginHorizontal: 24,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    padding: 8,
  },
  adImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  awardedByText: {
    fontSize: 12,
    color: 'grey',
    marginVertical: 4,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: redColor,
    textAlign: 'center',
  },
  adWinner: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 16,
    fontSize: 14,
  },
  sectionDivider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#eee',
  },
});

export default ConfirmReportIssues;
