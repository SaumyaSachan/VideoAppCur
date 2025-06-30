import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const PlayVideo = ({ route, videoUrl: propVideoUrl }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoUrl = propVideoUrl || route?.params?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4';

  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handleFullscreen = () => {
    if (isFullscreen) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsFullscreen(!isFullscreen);
  };

  const onSeek = (time) => {
    videoRef.current.seek(time);
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity onPress={handleFullscreen} activeOpacity={1} style={styles.video}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          paused={paused}
          resizeMode="contain"
          onLoad={onLoad}
          onProgress={onProgress}
          onError={e => { console.log('Video error:', e); }}
        />
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          <Text style={styles.controlText}>{paused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSeek(currentTime - 10)}>
          <Text style={styles.controlText}>-10s</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSeek(currentTime + 10)}>
          <Text style={styles.controlText}>+10s</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFullscreen}>
          <Text style={styles.controlText}>
            {isFullscreen ? 'Exit Full' : 'Fullscreen'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={onSeek}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#FFF"
          thumbTintColor="#FF0000"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#111',
  },
  controlText: {
    color: '#FFF',
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#111',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  timeText: {
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 5,
  },
});

export default PlayVideo; 