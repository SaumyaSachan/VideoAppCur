import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setHasSelectedGenres } from '../redux/slice/userSlice';

const LogOut = ({ navigation }) => {
  const dispatch = useDispatch();

  const logout = () => {
    auth().signOut().then(() => {
      dispatch(setHasSelectedGenres(false));
      navigation.replace('SplashScreen');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5252',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 