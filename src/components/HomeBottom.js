import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeBottom = () => {
  return (
    <View style={styles.bottomNav}>
      <FontAwesome name="home" size={24} color="#fff" />
      <FontAwesome name="video-camera" size={24} color="#fff" />
      <FontAwesome name="smile-o" size={24} color="#fff" />
      <FontAwesome name="tv" size={24} color="#fff" />
      <FontAwesome name="bars" size={24} color="#fff" />
    </View>
  );
};

export default HomeBottom;

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#111',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
}); 