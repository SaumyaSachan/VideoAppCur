import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Location from './Location';
import { useDispatch } from 'react-redux';
import { setHasSelectedGenres } from '../redux/slice/userSlice';

const Genre = ({ navigation }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const dispatch = useDispatch();

  const genres = [
    { name: 'Action', image: require('../../assets/GenreImages/ActionMovie.jpg') },
    { name: 'Romance', image: require('../../assets/GenreImages/Romance.jpg') },
    { name: 'Comedy', image: require('../../assets/GenreImages/Comedy.jpg') },
    { name: 'Drama', image: require('../../assets/GenreImages/Drama.jpg') },
    { name: 'Horror', image: require('../../assets/GenreImages/Horror.jpg') },
    { name: 'Sci-Fi', image: require('../../assets/GenreImages/SciFi.jpg') },
    { name: 'Cartoons', image: require('../../assets/GenreImages/Cartoons.jpg') },
    { name: 'Aspirants', image: require('../../assets/BannerImages/Aspirants.jpg') },
    { name: 'Panchayat', image: require('../../assets/BannerImages/Panchayat.jpeg') },
    { name: 'Oppenheimer', image: require('../../assets/BannerImages/oppenheimer.jpg') },
  ];

  const handleCheckboxChange = (genreName, isChecked) => {
    if (isChecked) {
      setSelectedGenres((prev) => [...prev, genreName]);
    } else {
      setSelectedGenres((prev) => prev.filter((name) => name !== genreName));
    }
  };

  const handleConfirm = () => {
    if (selectedGenres.length < 3) {
      Alert.alert(
        'Selection Required',
        'Please select at least 3 genres before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }
    dispatch(setHasSelectedGenres(true));
    console.log('Selected genres:', selectedGenres);
    navigation.navigate('HomePage');
  };

  const renderGenreItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.label}>{item.name}</Text>
      <BouncyCheckbox
        size={20}
        fillColor="skyblue"
        unfillColor="#fff"
        iconStyle={{ borderColor: 'skyblue' }}
        text=""
        isChecked={selectedGenres.includes(item.name)}
        onPress={(isChecked) => handleCheckboxChange(item.name, isChecked)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Explore videos by genre and discover new content
          </Text>
          <Text style={styles.selectedCount}>Selected: {selectedGenres.length}/3</Text>
          <View style={styles.gridNoScroll}>
            {genres.map((item, index) => renderGenreItem({ item, index }))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <Location />
        <TouchableOpacity
          style={[
            styles.confirmButton,
            selectedGenres.length < 3 && styles.confirmButtonDisabled,
            { marginTop: 0 }
          ]}
          onPress={handleConfirm}
          disabled={selectedGenres.length < 3}
        >
          <Text style={[
            styles.confirmText,
            selectedGenres.length < 3 && styles.confirmTextDisabled
          ]}>
            Confirm ({selectedGenres.length}/3)
          </Text>
        </TouchableOpacity>
      </View>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  gridNoScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '30%',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  label: {
    color: '#fff',
    marginVertical: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: 'skyblue',
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#666',
  },
  confirmText: {
    color: '#000',
    fontWeight: 'bold',
  },
  confirmTextDisabled: {
    color: '#999',
  },
  selectedCount: {
    color: 'skyblue',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#041524',
  },
});

export default Genre; 