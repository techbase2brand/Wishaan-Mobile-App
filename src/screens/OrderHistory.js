import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SEARCH_ICON } from '../assets/Image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import Header from '../components/Header'
import AddReviewModal from '../components/Modal/AddReviewModal';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';


const OrderHistory = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);



    const orders = [
        {
            id: '1',
            title: 'Regular Fit Slogan',
            address: '49 Featherstone Street...',
            status: 'Processing',
            date: '25 Jan 2024 at 12:14 AM',
            price: '$652',
            imageUrl: require('../assets/vipPoster.png'),
            rating: 3,
            reorderable: true,
        },
        {
            id: '2',
            title: 'Regular Fit Slogan',
            address: '49 Featherstone Street...',
            status: 'Delivered',
            date: '10 Jan 2024 at 1:14 PM',
            price: '$652',
            imageUrl: require('../assets/vipPoster.png'),
            rating: 4,
            reorderable: true,
        },
        {
            id: '3',
            title: 'Regular Fit Slogan',
            address: '49 Featherstone Street...',
            status: 'Delivered',
            date: '25 Jan 2024 at 12:14 AM',
            price: '$652',
            imageUrl: require('../assets/vipPoster.png'),
            rating: 4,
            reorderable: true,
        },
    ];
    const onPressAddAddress = () => {
        setModalVisible(true)
    }


    const renderOrder = ({ item }) => {
        return (
            <View  style={styles.orderCard}>
                <View style={[styles.orderHeader, { borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingBottom: 10 }]}>
                    <Image source={require('../assets/vipPoster.png')} style={styles.productImage} />
                    <View style={styles.orderDetails}>
                        <Text style={styles.orderTitle}>{item.title}</Text>
                        <Text style={styles.orderAddress}>{item.address}</Text>
                    </View>
                    <View>
                        <Text style={[styles.orderStatus, { backgroundColor: '#E6E6E6', color: item.status === 'Delivered' ? '#0C9409' : blackColor }]}>{item.status}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("OrderDetailsScreen", {
                                    // orderDetails: Item
                                })
                            }}
                        >
                            <Text style={[styles.viewProduct, { marginTop: 15 }]}>View Product</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingBottom: 10 }}>
                    <View style={styles.orderDetails}>
                        <Text style={[styles.orderTitle, { fontSize: 14, marginVertical: 10 }]}>{item.title}</Text>
                        <View style={[styles.orderInfo, { paddingBottom: 10 }]}>
                            <Text style={styles.orderAddress}>Quantity: {item.date}</Text>
                            <Text style={styles.orderPrice}>{item.price}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={[styles.orderInfo, { borderBottomWidth: 1, borderBottomColor: "#E6E6E6", paddingBottom: 10 }]}>
                    <Text style={styles.orderDate}>{Item.date}</Text> 
                     <Text style={styles.orderPrice}>{Item.price}</Text>
                </View> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    {item.rating > 0 && (
                        <TouchableOpacity style={styles.ratingContainer} onPress={onPressAddAddress}>
                            <Text style={styles.rateText}>Rate</Text>
                            <View style={styles.starsContainer}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Icon
                                        key={index}
                                        name={index < item.rating ? 'star' : 'star-outline'}
                                        size={20}
                                        color="#FFC107"
                                    />
                                ))}
                            </View>
                        </TouchableOpacity>
                    )}
                    {/* {item.status === 'Delivered' && item.reorderable && ( */}
                    {/* <TouchableOpacity style={[styles.reorderButton, { flexDirection: "row", marginTop: 20 }]} onPress={onPressAddAddress}>
                        <Text style={styles.reorderText}>Rate This Product </Text>
                    </TouchableOpacity> */}
                    {/* )} */}
                    <View style={styles.actionContainer}>
                        {item.status === 'Delivered' && item.reorderable && (
                            <TouchableOpacity style={[styles.reorderButton, { flexDirection: "row" }]}>
                                <FontAwesome name="recycle" size={20} color={whiteColor} />
                                <Text style={styles.reorderText}>Reorder</Text>
                            </TouchableOpacity>
                        )}
                        {item.status === 'Processing' && (
                            <TouchableOpacity style={styles.trackButton}>
                                <Text style={styles.trackText}>Track Order</Text>
                            </TouchableOpacity>
                        )}
                        {item.status === 'Payment failed' && (
                            <TouchableOpacity style={styles.paymentFailedButton}>
                                <Text style={styles.paymentFailedText}>Payment failed</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }




    return (
        <View style={styles.container}>
            <Header backIcon={true} text={"Order History"} navigation={navigation} />
            <View style={styles.searchcontainer}>
                <Image
                    source={SEARCH_ICON}
                    style={{ width: wp(6), height: hp(5), marginRight: 8, resizeMode: 'contain' }}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder="Search for ..."
                    placeholderTextColor="#888"
                />
            </View>
            <FlatList
                data={orders}
                renderItem={renderOrder}
                keyExtractor={data => data.id}
                contentContainerStyle={styles.listContainer}
            />
            {modalVisible && <AddReviewModal visible={modalVisible} onClose={() => setModalVisible(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    searchcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        width: wp(90),
        height: hp(5),
        marginVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    input: {
        height: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBar: {
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#F2F2F2',
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    orderCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    orderDetails: {
        flex: 1,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    orderAddress: {
        color: '#777',
        fontSize: 14,
    },
    orderStatus: {
        marginTop: 5,
        padding: 5,
        borderRadius: 10,
        // color: blackColor,
        fontSize: 12,
        textAlign: 'center',
    },
    viewProduct: {
        color: '#D9534F',
        fontSize: 12,
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    orderDate: {
        color: '#777',
        fontSize: 12,
    },
    orderPrice: {
        color: '#000',
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    rateText: {
        marginRight: 5,
        fontSize: 14,
        color: '#000',
    },
    starsContainer: {
        flexDirection: 'row',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    reorderButton: {
        padding: 10,
        backgroundColor: redColor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    reorderText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 5
    },
    trackButton: {
        paddingHorizontal: 10,
        paddingVertical:10,
        backgroundColor: redColor,
        borderRadius: 5,
    },
    trackText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    paymentFailedButton: {
        padding: 10,
        backgroundColor: '#D9534F',
        borderRadius: 5,
    },
    paymentFailedText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default OrderHistory;
