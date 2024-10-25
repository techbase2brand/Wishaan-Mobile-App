
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For star icons
import { redColor } from '../constants/Color';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewDescriptions, setReviewDescriptions] = useState([]);

  const handlePostReview = async () => {
    // if (rating === 0 || reviewText.trim() === '') {
    //   Alert.alert('Error', 'Please complete all fields.');
    //   return;
    // }

    // const newReviewDescription = reviewText.trim();
    // setReviewDescriptions(prev => [...prev, newReviewDescription]);

    // // Prepare data
    // const reviewData = {
    //   descriptions: reviewDescriptions.concat(newReviewDescription),
    // };

    // const ratingData = {
    //   ratings: [
    //     { "scale_min": "1.0", "scale_max": "5.0", "value": rating.toFixed(1) }
    //   ]
    // };
    // const numericProductID = productId.replace('gid://shopify/Product/', '');
    // console.log("reviewData Product ID:", reviewData);

    // try {
    //   // Update review descriptions
    //   await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
    //     metafield: {
    //       namespace: 'custom',
    //       key: 'reviewdes',
    //       value: JSON.stringify(reviewData.descriptions),
    //       type: 'list.single_line_text_field'
    //     }
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   // Update rating
    //   await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
    //     metafield: {
    //       namespace: 'custom',
    //       key: 'rating',
    //       value: JSON.stringify(ratingData.ratings),
    //       type: 'list.rating'
    //     }
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   Alert.alert('Success', 'Review posted successfully!');
    //   // Reset form
    //   setReviewText('');
    //   setRating(0);
    // } catch (error) {
    //   console.error('Error posting review:', error.response?.data || error.message);
    //   Alert.alert('Error', `Failed to post review: ${error.response?.data?.errors || error.message}`);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Your Review</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Icon
              name={star <= rating ? 'star' : 'star-border'}
              size={30}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Write your review here..."
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TouchableOpacity style={styles.button} onPress={handlePostReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width:"100%"
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign:"center",
   
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent:"center"
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height:50
  },
  button: {
    backgroundColor: redColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    height:54
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReviewForm;


