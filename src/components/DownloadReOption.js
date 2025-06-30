import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DownloadReOption = ({ visible, video, onDelete, onRedownload, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{video?.title}</Text>

          <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={onRedownload}>
            <Text style={styles.optionText}>Redownload</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, styles.closeButton]} onPress={onClose}>
            <Text style={[styles.optionText, { color: '#ccc' }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DownloadReOption;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#071b30',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  optionText: {
    color: '#4ac4fa',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
}); 