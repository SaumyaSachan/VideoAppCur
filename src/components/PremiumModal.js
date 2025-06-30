import React from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PremiumModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Image & Icon Row */}
          <View style={styles.topRow}>
            <Image source={require('../../assets/Intro2.png')} style={styles.thumbnail} />
            <FontAwesome name="crown" size={28} color="#00cfff" style={styles.icon} />
            <Text style={styles.planText}>This movie is included in the <Text style={styles.highlight}>PLATINUM</Text> plan.</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Upgrade your plan now to watch this movie</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Elevate your viewing experience and gain access to premium content by upgrading your plan now!
          </Text>

          {/* Buttons */}
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notNowButton} onPress={onClose}>
            <Text style={styles.notNowText}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PremiumModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#071b30',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  icon: {
    marginHorizontal: 10,
    backgroundColor: '#00cfff',
    borderRadius: 8,
    padding: 6,
  },
  planText: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
  },
  highlight: {
    color: '#00cfff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 25,
  },
  upgradeButton: {
    backgroundColor: '#2b8eff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  notNowButton: {
    borderColor: '#2b8eff',
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  notNowText: {
    color: '#2b8eff',
    fontWeight: 'bold',
  },
}); 