import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { loadHasSelectedGenres } from '../redux/slice/userSlice';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/Intro1.png'),
  require('../../assets/Intro2.png'),
  require('../../assets/Group8148.png'),
];

function FirstScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const hasSelectedGenres = useSelector(state => state.user.hasSelectedGenres);

  useEffect(() => {
    dispatch(loadHasSelectedGenres());
  }, [dispatch]);

  const handleGetEntertainment = () => {
    if (user) {
      if (hasSelectedGenres) {
        navigation.replace('HomePage');
      } else {
        navigation.replace('Genre');
      }
    } else {
      navigation.replace('BottomTab');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop
        autoPlay
        data={images}
        scrollAnimationDuration={2000}
        width={width}
        height={height * 0.75} 
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={handleGetEntertainment}
        >
          <Text style={styles.buttonText}>Get Entertainment</Text>
        </TouchableOpacity>
        <Button title="Skip" onPress={handleGetEntertainment} />
      </View>
    </SafeAreaView>
  );
}

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: width,
    height: height * 0.75,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  buttonTouchable: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 