// import { DrawerActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeCardList from '../components/HomeCardList';
import HomeHeader from '../components/HomeHeader';
import HomeBottom from '../components/HomeBottom';
import HomeBanner from '../components/HomeBanner';
import PremiumModal from '../components/PremiumModal';

const HomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openPremiumModal = () => setModalVisible(true);
  const closePremiumModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HomeHeader navigation={navigation} />

        {/* Featured Banner */}
        <HomeBanner navigation={navigation} />

        {/* Flash Channel */}
        <HomeCardList
          title="Flash Channel"
          items={[
            {
              image: require('../../assets/GenreImages/Romance.jpg'),
              onPress: () => navigation.navigate('VideoDetailScreen', {
                title: 'Squid Game',
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
              }),
            },
            {
              image: require('../../assets/GenreImages/ActionMovie.jpg'),
              onPress: openPremiumModal,
            },
            {
              image: require('../../assets/GenreImages/Drama.jpg'),
              onPress: openPremiumModal,
            },
          ]}
        />

        {/* Stay at Home */}
        <HomeCardList
          title="Stay at Home"
          items={[
            {
              image: require('../../assets/GenreImages/SciFi.jpg'),
              onPress: openPremiumModal,
            },
            {
              image: require('../../assets/GenreImages/Horror.jpg'),
              onPress: openPremiumModal,
            },
            {
              image: require('../../assets/Intro1.png'),
              onPress: openPremiumModal,
            },
          ]}
        />
      </ScrollView>

      {/* Download Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('DownloadedVideo')}
        style={styles.downloadButton}
      >
        <Text style={styles.downloadButtonText}>Go to Downloads</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <HomeBottom />

      {/* Premium Modal */}
      <PremiumModal visible={modalVisible} onClose={closePremiumModal} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  downloadButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
