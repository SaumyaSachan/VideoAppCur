import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Success', 'User account created');
        navigation.replace('Genre');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else {
          Alert.alert('Error', error.message);
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 40, fontSize: 40, textAlign: 'center' }}>Create account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Go to sign in</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
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
    margin: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 