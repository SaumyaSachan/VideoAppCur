import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera } from 'react-native-image-picker';

const Camera = ({ navigation, route }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleTakePhoto = async () => {
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (route.params && typeof route.params.onPhotoTaken === 'function') {
          route.params.onPhotoTaken(uri);
        }
        navigation.goBack();
      }
    });
  };

  const handleRecordVideo = () => {
    if (isRecording) {
      setIsRecording(false);
      Alert.alert('Camera', 'Video recording stopped');
    } else {
      setIsRecording(true);
      Alert.alert('Camera', 'Video recording started');
    }
  };

  const handleSwitchCamera = () => {
    Alert.alert('Camera', 'Switch camera functionality would be implemented here');
  };

  const handleFlashToggle = () => {
    Alert.alert('Camera', 'Flash toggle functionality would be implemented here');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Camera</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <FontAwesome name="cog" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraView}>
        <View style={styles.cameraPlaceholder}>
          <FontAwesome name="camera" size={80} color="#666" />
          <Text style={styles.cameraText}>Camera Preview</Text>
          <Text style={styles.cameraSubtext}>
            Camera functionality would be implemented here
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleFlashToggle}>
            <FontAwesome name="flash" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={handleSwitchCamera}>
            <FontAwesome name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
            <FontAwesome name="camera" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.recordButton, isRecording && styles.recordingButton]} 
            onPress={handleRecordVideo}
          >
            <FontAwesome 
              name={isRecording ? "stop" : "video-camera"} 
              size={30} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.modeSelector}>
          <TouchableOpacity style={styles.modeButton}>
            <Text style={styles.modeText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modeButton, styles.activeModeButton]}>
            <Text style={[styles.modeText, styles.activeModeText]}>Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 10,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    padding: 40,
  },
  cameraText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  cameraSubtext: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  controls: {
    paddingBottom: 40,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  photoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#ff0000',
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modeButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeModeButton: {
    backgroundColor: '#2b8eff',
  },
  modeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activeModeText: {
    color: '#fff',
  },
});

export default Camera; 