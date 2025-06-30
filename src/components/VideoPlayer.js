import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VideoPlayer = ({ video, onPlay, onPause, onSeek, isPlaying = false }) => {
  // Support both local require and remote URL for thumbnail
  const imageSource = typeof video.thumbnail === 'number' ? video.thumbnail : { uri: video.thumbnail };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image source={imageSource} style={styles.videoThumbnail} />
        <Text style={styles.videoTitle}>{video?.title || 'Video Player'}</Text>
        {/* Show video URL for debugging or reference */}
        <Text style={styles.videoUrl}>{video?.videoUrl}</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome name="step-backward" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={isPlaying ? onPause : onPlay}>
          <FontAwesome name={isPlaying ? "pause" : "play"} size={30} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome name="step-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  videoUrl: {
    color: '#ccc',
    fontSize: 10,
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#0a0a0a',
  },
  controlButton: {
    padding: 15,
    marginHorizontal: 10,
  },
  playButton: {
    backgroundColor: '#2b8eff',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2b8eff',
    width: '30%',
  },
});

export default VideoPlayer; 