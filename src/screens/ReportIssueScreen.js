// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {redColor} from '../constants/Color';
// import Header from '../components/Header';

// const ReportIssueScreen = ({navigation}) => {
//   const [form, setForm] = useState({
//     issueType: '',
//     name: '',
//     email: '',
//     phoneNumber: '',
//     message: '',
//   });

//   const handleInputChange = (name, value) => {
//     setForm({...form, [name]: value});
//   };

//   const handleSubmit = () => {
//     // Submit form logic here
//     console.log('Form submitted:', form);
//     setForm({});
//   };

//   return (
// <View style={{flex:1, backgroundColor:"#ffffff"}}>
// <Header
//         backIcon={true}
//         text={'Report a Issue'}
//         navigation={navigation}
//         marginleft={20}
//       />
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backIcon}>
//         <Icon name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       <Text style={styles.header}>Report a Issue</Text> */}

//       <View style={styles.disclaimerBox}>
//         <Text style={styles.disclaimerTitle}>Disclaimer</Text>
//         <Text style={styles.disclaimerText}>
//           Tell us what you love about the app, or what we could be doing better.
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="How can we help you *"
//         value={form.issueType}
//         onChangeText={value => handleInputChange('issueType', value)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Name*"
//         value={form.name}
//         onChangeText={value => handleInputChange('name', value)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email*"
//         value={form.email}
//         onChangeText={value => handleInputChange('email', value)}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Phone number*"
//         value={form.phoneNumber}
//         onChangeText={value => handleInputChange('phoneNumber', value)}
//         keyboardType="phone-pad"
//       />

//       <TextInput
//         style={[styles.input, styles.messageInput]}
//         placeholder="Message*"
//         value={form.message}
//         onChangeText={value => handleInputChange('message', value)}
//         multiline
//       />

//       {/* <TouchableOpacity style={styles.attachmentButton}>
//         <Text style={styles.attachmentText}>+Add attachment</Text>
//       </TouchableOpacity> */}

//       <Text style={styles.footerText}>
//         Please use this form only for report and
//       </Text>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           width: '90%',
//           alignSelf:"center"
//         }}>
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Submit feedback</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     // flexGrow: 1,
//   },
//   backIcon: {
//     marginBottom: 16,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   disclaimerBox: {
//     borderColor: '#808080',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   disclaimerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   disclaimerText: {
//     fontSize: 14,
//     color: '#888888',
//   },
//   input: {
//     borderColor: '#808080',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   messageInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   attachmentButton: {
//     marginBottom: 16,
//   },
//   //   attachmentText: {
//   //     color: '#D32F2F',
//   //     fontSize: 16,
//   //     fontWeight: '500',
//   //   },
//   footerText: {
//     fontSize: 12,
//     color: '#888888',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   submitButton: {
//     backgroundColor: redColor,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ReportIssueScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {redColor} from '../constants/Color';
import Header from '../components/Header';
import {launchImageLibrary} from 'react-native-image-picker';

const ReportIssueScreen = ({navigation}) => {
  const [form, setForm] = useState({
    issueType: '',
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [attachments, setAttachments] = useState([]);

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleAddAttachment = () => {
    if (attachments.length >= 3) {
      alert('You can only upload up to 3 images.');
      return;
    }
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 300, maxHeight: 300},
      response => {
        if (response.assets) {
          setAttachments([...attachments, response.assets[0].uri]);
        }
      },
    );
  };
  const handleRemoveAttachment = index => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };
  const handleSubmit = () => {
    console.log('Form submitted:', form);
    console.log('Attachments:', attachments);
    setForm({});
    setAttachments([]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Header
        backIcon={true}
        text={'Report an Issue'}
        navigation={navigation}
        marginleft={20}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Tell us what you love about the app, or what we could be doing
            better.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="How can we help you *"
          value={form.issueType}
          onChangeText={value => handleInputChange('issueType', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Name*"
          value={form.name}
          onChangeText={value => handleInputChange('name', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email*"
          value={form.email}
          onChangeText={value => handleInputChange('email', value)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number*"
          value={form.phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message*"
          value={form.message}
          onChangeText={value => handleInputChange('message', value)}
          multiline
        />

        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={handleAddAttachment}>
          <Text style={styles.attachmentText}>+ Add attachment</Text>
        </TouchableOpacity>

        {/* <View style={styles.attachmentsContainer}>
          {attachments.map((uri, index) => (
            <View key={index} style={styles.attachmentWrapper}>
              <Image source={{uri}} style={styles.attachmentImage} />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => handleRemoveAttachment(index)}>
                <AntDesign name="close" size={15} color={'#fff'} />
              </TouchableOpacity>
            </View>
          ))}
        </View> */}

        <Text style={styles.footerText}>
          Please use this form only for report and feedback purposes.
        </Text>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          width: '90%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  disclaimerBox: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#888888',
  },
  input: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  attachmentButton: {
    marginBottom: 16,
  },
  attachmentText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '500',
  },
  attachmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  attachmentImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: redColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attachmentWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  attachmentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: -10,
    right: -7,
    backgroundColor: redColor,
    borderRadius: 10,
    padding: 2,
  },
});

export default ReportIssueScreen;
