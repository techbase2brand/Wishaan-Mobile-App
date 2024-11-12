// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Modal,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Header from '../components/Header';

// const ProfileScreen = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [dob, setDob] = useState(new Date());
//   const [anniversary, setAnniversary] = useState('');
//   const [gender, setGender] = useState('Select Gender');
//   const [showGenderModal, setShowGenderModal] = useState(false);

//   const [showDobPicker, setShowDobPicker] = useState(false);
//   const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);

//   const genders = ['Male', 'Female', 'Other'];

//   useEffect(() => {
//     // Set the initial values for dob and anniversary to the current date in formatted form
//     setDob(new Date());
//     setAnniversary(new Date());
//   }, []);

//   const formatDate = date => {
//     return date.toLocaleDateString();
//   };

//   const onChangeDob = (event, selectedDate) => {
//     const currentDate = selectedDate || dob;
//     setShowDobPicker(false);
//     setDob(currentDate);
//   };

//   const selectGender = selectedGender => {
//     setGender(selectedGender);
//     setShowGenderModal(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         backIcon={true}
//         navigation={navigation}
//         marginleft={4}
//         text={'Your Profile'}
//       />
//       <View style={{paddingHorizontal: 20, marginTop: 40}}>
//         <Image
//           source={require('../assets/profileimg.png')}
//           style={styles.profileImage}
//         />
//         <Text style={styles.profileName}>David Smith</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Your name *</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Phone number *</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your phone number"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email *</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Date of birth *</Text>
//           <TouchableOpacity
//             onPress={() => setShowDobPicker(true)}
//             style={styles.dateInput}>
//             <Text style={styles.dateText}>{formatDate(dob)}</Text>
//             {/* <Text style={styles.dateText}>{dob || 'Enter Date of birth'}</Text> */}
//             <Icon name="calendar-today" size={20} color="gray" />
//           </TouchableOpacity>
//           {showDobPicker && (
//             <DateTimePicker
//               value={new Date()}
//               mode="date"
//               display="default"
//               onChange={onChangeDob}
//             />
//           )}
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Gender *</Text>
//           <TouchableOpacity
//             onPress={() => setShowGenderModal(true)}
//             style={styles.dateInput}>
//             <Text style={styles.dateText}>{gender}</Text>
//             <Icon name="keyboard-arrow-down" size={20} color="gray" />
//           </TouchableOpacity>
//         </View>

//         {/* Gender Selector Modal */}
//         <Modal
//           transparent={true}
//           animationType="slide"
//           visible={showGenderModal}
//           onRequestClose={() => setShowGenderModal(false)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Select Gender</Text>
//               <FlatList
//                 data={genders}
//                 keyExtractor={item => item}
//                 renderItem={({item}) => (
//                   <TouchableOpacity
//                     onPress={() => selectGender(item)}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalOptionText}>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </View>
//         </Modal>

//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateButtonText}>Update profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: 'center',
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   inputContainer: {
//     marginVertical: 10,
//   },
//   label: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 10,
//     paddingRight: 40,
//     fontSize: 16,
//     color: '#333',
//   },
//   icon: {
//     position: 'absolute',
//     right: 10,
//     top: 15,
//   },
//   changeText: {
//     color: 'red',
//     position: 'absolute',
//     right: 10,
//     top: 15,
//   },
//   dateInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 10,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   updateButton: {
//     backgroundColor: '#b01b1b',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: 300,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modalOption: {
//     paddingVertical: 10,
//     alignItems: 'center',
//     width: '100%',
//   },
//   modalOptionText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default ProfileScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/MaterialIcons';

import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../components/Header';
import {redColor} from '../constants/Color';

const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1709884735028-8c4c38e673da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  );

  // Address fields
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  // Open image picker to change profile image
  const handleEditImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Image selection failed. Please try again.');
      } else {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        backIcon={true}
        navigation={navigation}
        marginleft={4}
        text={'Your Profile'}
      />
      <ScrollView style={styles.container}>
        {/* <Text style={styles.title}>Your Profile</Text> */}
        <TouchableOpacity onPress={handleEditImage}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
          <View style={styles.editIconContainer}>
            <Icon name="edit" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        {/* <Image source={require('../assets/profileimg.png')} style={styles.profileImage} /> */}
        <Text style={styles.profileName}>David Smith</Text>

        {/* Personal Information */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of birth *</Text>
        <TouchableOpacity onPress={() => setShowDobPicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{formatDate(dob)}</Text>
          <Icon name="calendar-today" size={20} color="gray" />
        </TouchableOpacity>
        {showDobPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={onChangeDob}
          />
        )}
      </View> */}

        {/* 
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>{gender}</Text>
          <Icon name="keyboard-arrow-down" size={20} color="gray" />
        </TouchableOpacity>
      </View> */}

        {/* Address Information */}
        <Text style={styles.sectionTitle}>Address Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your state"
            value={state}
            onChangeText={setState}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postal Code *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your postal code"
            keyboardType="numeric"
            value={postalCode}
            onChangeText={setPostalCode}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        {/* Payment Information Placeholder */}
        <Text style={[styles.sectionTitle]}>Payment Information</Text>
        <TouchableOpacity style={[styles.paymentOption, {marginBottom: 80}]}>
          <Text style={styles.paymentText}>Add Payment Method</Text>
          <Icon name="payment" size={24} color="#333" />
        </TouchableOpacity>

        {/* Gender Selector Modal */}
        {/* <Modal
        transparent={true}
        animationType="slide"
        visible={showGenderModal}
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <FlatList
              data={genders}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectGender(item)} style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal> */}
        {/* main  aa likhu tu aajye main beth likhu tu aa bethe  */}
      </ScrollView>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: redColor,
    borderRadius: 100,
    padding: 5,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    width: '90%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: redColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
