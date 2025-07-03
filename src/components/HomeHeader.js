import { View, Text, StyleSheet } from 'react-native';
import { Image, Pressable } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.headerIcons}>
        <Pressable onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={22} color="#00BFFF" style={styles.iconBox} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Notification')}>
          <FontAwesome name="bell-o" size={22} color="#00BFFF" style={styles.iconBox} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('HomeDrawer')}>
          <Image source={require('../../assets/Intro1.png')} style={styles.avatar} />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 42,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0a1a2a',
 
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#111',
    padding: 6,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#111',
  },
}); 