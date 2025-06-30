import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { loadHasSelectedGenres } from '../redux/slice/userSlice';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const hasSelectedGenres = useSelector(state => state.user.hasSelectedGenres);

  useEffect(() => {
    dispatch(loadHasSelectedGenres());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('FirstScreen');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#041524',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen; 