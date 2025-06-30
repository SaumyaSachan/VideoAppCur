import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Success', 'Logged in successfully');
        navigation.replace('Genre');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password');
        } else {
          Alert.alert('Error', error.message);
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={{ marginBottom: 40, fontSize: 40, textAlign: 'center' }}>Sign in</Text> */}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={[styles.button, { backgroundColor: '#2196F3' }]}
      >
        <Text style={styles.buttonText}>Go to Sign Up</Text>
      </TouchableOpacity> */}
      
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 