import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';
import Header from '../components/Header';

const PickupAddressScreen = ({ navigation }) => {
    const [selectedAddress, setSelectedAddress] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectAddress = () => {
        setSelectedAddress(!selectedAddress);
    };

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    return (
        <ScrollView style={styles.container}>
            {/* {/ Header /} */}
            <Header
                backIcon={true}
                navigation={navigation}
                text={"My Address"} />
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <AntDesign name="plus" size={20} color={redColor} />
                    <Text style={styles.addAddress}>Add Address</Text>
                </TouchableOpacity>
            </View> */}

            <TouchableOpacity style={[styles.section, {
                borderWidth: 1,
                borderColor: "#E6E6E6",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 4,
                marginVertical: 20
            }]}
                onPress={() => navigation.navigate("OrderDetailsScreen")}>
                <View style={styles.sectionRow}>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <AntDesign name="plus" size={20} color={redColor} />
                        <Text style={styles.addAddress}>Add Address</Text>
                    </TouchableOpacity>
                </View>
                <Icon name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            {/* <Text style={styles.title}>Select Pick Up Address</Text> */}
            {/* <Text style={styles.stepText}>Step 1 to 3</Text> */}

            {/* {/ Address Card /} */}
            <TouchableOpacity style={styles.addressCard} activeOpacity={0.9}>
                <View style={styles.addressRow}>
                    <View>
                        <Text style={styles.addressName}>Home</Text>
                        <Text style={[styles.orderId, { width: "80%" }]}>49 Featherstone Street, LONDON EC1Y 8SY</Text>
                        <Text style={[styles.addressPhone]}>Phone Number: +157 214 2541</Text>
                        {/* <Text style={styles.returnPickup}>Return Pickup available</Text>
                        <Text style={styles.exchangeAvailable}>Exchange available</Text> */}
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#e6e6e6", borderRadius: 100, width: 30, height: 30, paddingHorizontal: 5, paddingVertical: 5 }}
                            onPress={handleOpenModal}
                        >
                            <Entypo name="dots-three-horizontal" size={18} color={redColor} />
                        </TouchableOpacity>
                        {/* Modal with Edit and Delete options */}
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            animationType="fade"
                            onRequestClose={handleCloseModal}
                        >
                            <Pressable style={styles.overlay} onPress={handleCloseModal}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity style={styles.modalOption} onPress={() => console.log('Edit clicked')}>
                                        <Text style={styles.optionText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalOption} onPress={() => console.log('Delete clicked')}>
                                        <Text style={styles.optionText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        </Modal>
                    </View>
                </View>
                <TouchableOpacity style={styles.radioButton} onPress={handleSelectAddress} activeOpacity={0.9}>
                    <Icon name={selectedAddress ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={redColor} />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* {/ Ads Section /} */}
            <View style={styles.adsContainer}>
                <Text style={styles.adsTitle}>Ads</Text>
                <Image
                    source={require('../assets/vipPoster.png')}
                    style={styles.adsImage}
                />
            </View>

            {/* {/ Proceed Button /} */}
            <TouchableOpacity style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 6
    },
    addAddress: {
        color: redColor,
        fontSize: 16,
        marginLeft: 4,
    },
    stepText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    addressCard: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: "100%"
    },
    addressName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    addressDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    addressPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
    },
    returnPickup: {
        fontSize: 14,
        color: redColor,
        marginBottom: 4,
    },
    exchangeAvailable: {
        fontSize: 14,
        color: redColor,
    },
    radioButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 20,
        top: 16
    },
    adsContainer: {
        marginBottom: 80,
    },
    adsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: redColor,
        marginBottom: 8,
    },
    adsImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    proceedButton: {
        backgroundColor: redColor,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 70,
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
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
        position: "absolute",
        left: 0,
        top: "40%",
        paddingVertical: 10,
        borderRadius: 8,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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

export default PickupAddressScreen;
