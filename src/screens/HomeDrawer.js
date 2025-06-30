import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectDownloadedVideos, removeDownloadedVideo } from '../redux/slice/videoDownloadSlice';
import { useSelector } from 'react-redux';

const HomeDrawer = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const downloadedVideos = useAppSelector(selectDownloadedVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const profileImage = useSelector(state => state.user.profileImage);

  const handleLogout = () => {
    navigation.navigate('LogOut');
  };

  const handleDeleteVideo = (video) => {
    setSelectedVideo(video);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedVideo) {
      dispatch(removeDownloadedVideo(selectedVideo.id));
      setDeleteModalVisible(false);
      setSelectedVideo(null);
      Alert.alert('Success', 'Video deleted successfully');
    }
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'My Profile',
      icon: 'user',
      onPress: () => {
        navigation.navigate('EditProfile');
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'cog',
      onPress: () => {
        // Navigate to settings screen
        console.log('Navigate to Settings');
      },
    },
    {
      id: 'device',
      title: 'My Device',
      icon: 'mobile',
      onPress: () => {
        // Navigate to device screen
        console.log('Navigate to My Device');
      },
    },
    {
      id: 'downloads',
      title: `Downloaded Videos (${downloadedVideos.length})`,
      icon: 'download',
      onPress: () => {
        navigation.navigate('DownloadedVideo');
      },
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'sign-out',
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with Profile Info */}
        <View style={styles.header}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/Intro1.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'John Doe'}
            </Text>
            <Text style={styles.profileEmail}>
              {currentUser?.email || 'john.doe@example.com'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <FontAwesome name={item.icon} size={20} color="#fff" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Downloaded Videos Section */}
        {downloadedVideos.length > 0 && (
          <View style={styles.downloadedSection}>
            <Text style={styles.sectionTitle}>Recent Downloads</Text>
            {downloadedVideos.slice(0, 3).map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoItem}
                onPress={() => navigation.navigate('DownloadedVideo')}
              >
                <Image 
                  source={{ uri: video.thumbnail }} 
                  style={styles.videoThumbnail}
                  defaultSource={require('../../assets/Intro1.png')}
                />
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={1}>
                    {video.title}
                  </Text>
                  <Text style={styles.videoQuality}>{video.quality}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteVideo(video)}
                >
                  <FontAwesome name="trash" size={16} color="#ff4757" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>VideoApp v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Video</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete "{selectedVideo?.title}"?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041524',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#ccc',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 15,
    width: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  downloadedSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2a3a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  videoThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  videoQuality: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#0a1a2a',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4757',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeDrawer; 