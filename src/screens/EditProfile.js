import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfileImageToAsyncStorage, loadProfileImageFromAsyncStorage, updateUser } from '../redux/slice/userSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const defaultProfilePic = require('../../assets/Intro1.png');
const altProfilePic = require('../../assets/logo.png');

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImage = useSelector(state => state.user.profileImage);
  const currentUser = useSelector(state => state.user.currentUser);
  console.log('Current User in EditProfile:', currentUser);
  const email = currentUser?.email || 'john.doe@example.com';
  console.log('Email used in EditProfile:', email);
  const phone = currentUser?.phone || '+91 9876543210';
  const [name, setName] = useState(email.split('@')[0]);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(loadProfileImageFromAsyncStorage());
  }, [dispatch]);

  const handleChangePhoto = () => {
    setModalVisible(true);
  };

  const handleResetPhoto = () => {
    dispatch(saveProfileImageToAsyncStorage(''));
  };

  const handleSave = () => {
    dispatch(updateUser({ email, name, bio }));
    Alert.alert('Profile Saved', 'Your profile has been updated.');
  };

  const handleTakePhoto = () => {
    setModalVisible(false);
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets.length > 0) {
        dispatch(saveProfileImageToAsyncStorage(response.assets[0].uri));
      }
    });
  };

  const handleChooseFromGallery = () => {
    setModalVisible(false);
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets && response.assets.length > 0) {
        dispatch(saveProfileImageToAsyncStorage(response.assets[0].uri));
      }
    });
  };

  let profilePicSource = defaultProfilePic;
  if (profileImage) {
    if (profileImage.startsWith('http') || profileImage.startsWith('file')) {
      profilePicSource = { uri: profileImage };
    } else {
      profilePicSource = defaultProfilePic;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image source={profilePicSource} style={styles.profilePic} />
        <View style={styles.photoButtonsRow}>
          <TouchableOpacity style={styles.photoButton} onPress={handleChangePhoto}>
            <Text style={styles.photoButtonText}>Change Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={handleResetPhoto}>
            <Text style={styles.photoButtonText}>Reset Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          editable={false}
        />
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <TouchableOpacity style={{ padding: 15 }} onPress={handleTakePhoto}>
              <Text style={{ fontSize: 16, color: '#007bff', textAlign: 'center' }}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 15 }} onPress={handleChooseFromGallery}>
              <Text style={{ fontSize: 16, color: '#007bff', textAlign: 'center' }}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 15 }} onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 16, color: '#ff3b30', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041524',
    padding: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2b8eff',
  },
  photoButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  photoButton: {
    backgroundColor: '#2b8eff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#12263a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#00cfff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfile; 