import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VideoListItem = ({ video, onPress, onDownload, showDownloadButton = true }) => {
  // Support both local require and remote URL
  const imageSource = typeof video.thumbnail === 'number' ? video.thumbnail : { uri: video.thumbnail };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(video)}>
      <Image source={imageSource} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.duration}>{video.duration}</Text>
        <Text style={styles.views}>{video.views} views</Text>
      </View>
      {showDownloadButton && (
        <TouchableOpacity style={styles.downloadButton} onPress={() => onDownload(video)}>
          <FontAwesome name="download" size={16} color="#2b8eff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0a1a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  duration: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 3,
  },
  views: {
    color: '#999',
    fontSize: 12,
  },
  downloadButton: {
    padding: 10,
  },
});

export default VideoListItem; 