import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectDownloadedVideos, removeDownloadedVideo } from '../redux/slice/videoDownloadSlice';
import DownloadReOption from '../components/DownloadReOption';

const { width, height } = Dimensions.get('window');

const DownloadedVideoScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const downloadedVideos = useAppSelector(selectDownloadedVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [reOptionVisible, setReOptionVisible] = useState(false);

  const handleVideoPress = (video) => {
    navigation.navigate('PlayVideo', { videoUrl: video.videoUrl, title: video.title });
  };

  const handleMenuPress = (video) => {
    setSelectedVideo(video);
    setReOptionVisible(true);
  };

  const handleDelete = () => {
    if (selectedVideo) {
      dispatch(removeDownloadedVideo(selectedVideo.id));
      setReOptionVisible(false);
      setSelectedVideo(null);
    }
  };

  const handleRedownload = () => {
    // Placeholder for redownload logic
    setReOptionVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoCard} onPress={() => handleVideoPress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.videoMeta}>
          {item.duration}  {item.quality}  {item.fileSize}
        </Text>
        <Text style={styles.downloadDate}>
          Downloaded on {formatDate(item.downloadDate)}
        </Text>
        <View style={styles.videoActions}>
          <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('PlayVideo', { videoUrl: item.videoUrl, title: item.title })}>
            <FontAwesome name="play" size={16} color="#fff" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => handleMenuPress(item)}
          >
            <FontAwesome name="ellipsis-v" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="download" size={80} color="#666" />
      <Text style={styles.emptyTitle}>No Downloaded Videos</Text>
      <Text style={styles.emptySubtitle}>
        Videos you download will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Downloaded Videos</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={downloadedVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <DownloadReOption
        visible={reOptionVisible}
        video={selectedVideo}
        onDelete={handleDelete}
        onRedownload={handleRedownload}
        onClose={() => setReOptionVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041524',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0a1a2a',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#0a1a2a',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 120,
    height: 80,
  },
  videoInfo: {
    flex: 1,
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  downloadDate: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b8eff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  playText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  menuButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 40,
  },
});

export default DownloadedVideoScreen; 