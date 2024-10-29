import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import {redColor} from '../constants/Color';

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

const ReviewScreen = ({navigation, route}) => {
  const [reviewRating, setReviewRating] = useState([]);
  const [reviewDescription, setReviewDescription] = useState([]);
  const [reviewsData, setReviewsData] = useState(reviewsDataa);
  const {product} = route?.params;

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
      <Header
        backIcon={true}
        text={'Ratings & Reviews'}
        notificationIcon={false}
        navigation={navigation}
      />
      {/* <ReviewForm productId={product?.productId} /> */}
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
          <Text style={styles.statLabel}>{reviewsData?.length} Reviews</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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

export default ReviewScreen;
