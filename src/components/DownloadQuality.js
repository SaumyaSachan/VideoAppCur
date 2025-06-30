import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const DownloadQuality = ({ visible, onClose, onQualitySelect, video }) => {
  const [selected, setSelected] = useState('720p');

  const qualities = ['1080p', '720p', '480p', '144p'];

  const handleDownload = () => {
    onQualitySelect(selected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Quality</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.videoTitle}>{video?.title}</Text>

          <View style={styles.qualityList}>
            {qualities.map((quality) => (
              <TouchableOpacity
                key={quality}
                style={styles.qualityItem}
                onPress={() => setSelected(quality)}
              >
                <View style={[styles.radio, selected === quality && styles.selected]} />
                <Text style={styles.qualityText}>{quality === '1080p' ? 'Full HD' : quality}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cancelButton, { backgroundColor: '#2b8eff', marginTop: 10 }]} onPress={handleDownload}>
            <Text style={styles.cancelText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#0a1a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: height * 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  qualityList: {
    paddingHorizontal: 20,
  },
  qualityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1a2a3a',
    borderRadius: 10,
    marginBottom: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#2b8eff',
  },
  qualityText: {
    color: '#fff',
  },
  cancelButton: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DownloadQuality; 