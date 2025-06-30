import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeCardList({ title, items, onImagePress }) {
  const navigation = useNavigation();

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress ? item.onPress : () => {}}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.thumbnail} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  moreText: {
    color: '#4ac4fa',
    fontSize: 14,
  },
  listContainer: {
    paddingLeft: 5,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 140,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
}); 