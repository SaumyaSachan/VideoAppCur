import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayVideo from '../components/PlayVideo';
import DownloadQuality from '../components/DownloadQuality';
import CastCardList from '../components/CastCardList';
import { useAppDispatch } from '../redux/hooks';
import { addDownloadedVideo } from '../redux/slice/videoDownloadSlice';

const VideoDetailScreen = ({ route }) => {
  const { title = "Squid Game", videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4" } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const qualitySelect = (quality) => {
    // Create video object with all necessary properties
    const videoData = {
      id: Date.now().toString(), // Generate unique ID
      title: title,
      videoUrl: videoUrl,
      quality: quality,
      thumbnail: 'https://picsum.photos/200/120', // Use a remote URL instead of require()
      duration: '2h 37m',
      fileSize: quality === '1080p' ? '2.5GB' : quality === '720p' ? '1.8GB' : quality === '480p' ? '1.2GB' : '800MB',
      downloadDate: new Date().toISOString(),
      genre: 'Action, Adventure, Fantasy',
      director: 'Denis Villenueve',
      country: 'UK, USA',
      releaseYear: '2021',
      rating: '8.6'
    };

    // Add to Redux store
    dispatch(addDownloadedVideo(videoData));

    Alert.alert(
      'Download Started',
      `Downloading "${title}" in ${quality} quality...`,
      [
        { 
          text: 'OK',
          onPress: () => {
            console.log(`Downloaded video "${title}" in ${quality} quality`);
            console.log('Video data stored in Redux:', videoData);
          }
        }
      ]
    );
  };

  console.log('Download modal visible:', modalVisible);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PlayVideo videoUrl={videoUrl} />
        <View style={styles.titleRow}>
          <Text style={styles.videoTitle}>{title}</Text>
          <View style={styles.icons}>
            <FontAwesome name="share-alt" size={20} color="white" style={styles.icon} />
            <FontAwesome name="heart-o" size={20} color="white" style={styles.icon} />
          </View>
        </View>
        <Text style={styles.metaText}>8.6 <FontAwesome name="imdb" size={16} />  |  2h 37m</Text>
        <Text style={styles.genreText}>Action, Adventure, Fantasy</Text>
        <Text style={styles.description}>
          An idealistic FBI agent is enlisted by a government task force to aid in the escalating war...
        </Text>
        <Text style={styles.detailText}><Text style={styles.label}>Director:</Text> Denis Villenueve</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Country:</Text> UK, USA</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Release:</Text> 2021</Text>
       
       
      </ScrollView>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <FontAwesome name="list" size={18} color="#fff" />
          <Text style={styles.actionText}>Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(true)}>
          <FontAwesome name="download" size={18} color="#fff" />
          <Text style={styles.actionText}>Downloaded</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Cast</Text>
      <CastCardList />
      <DownloadQuality 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onQualitySelect={qualitySelect}
        video={{ title: title }}
      />
    </View>
  );
};

export default VideoDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#041524' },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  videoTitle: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  icons: { flexDirection: 'row' },
  icon: { marginLeft: 15 },
  metaText: { color: '#ccc', marginLeft: 15, fontSize: 12 },
  genreText: { color: '#ccc', marginLeft: 15, fontSize: 14, marginBottom: 5 },
  description: { color: '#aaa', margin: 15, fontSize: 13 },
  detailText: { color: '#ccc', marginHorizontal: 15, marginBottom: 3 },
  label: { fontWeight: 'bold', color: '#fff' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { color: 'white', marginLeft: 5 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginTop: 20 },
}); 