import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Mock search results
  const mockResults = [
    {
      id: '1',
      title: 'Amazing Nature Documentary',
      thumbnail: 'https://picsum.photos/200/120',
      duration: '45:30',
      views: '1.2M',
    },
    {
      id: '2',
      title: 'Cooking Masterclass',
      thumbnail: 'https://picsum.photos/200/121',
      duration: '32:15',
      views: '856K',
    },
    {
      id: '3',
      title: 'Tech Review 2024',
      thumbnail: 'https://picsum.photos/200/122',
      duration: '18:45',
      views: '2.1M',
    },
    {
      id: '4',
      title: 'Fitness Workout',
      thumbnail: 'https://picsum.photos/200/123',
      duration: '25:20',
      views: '567K',
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResults(mockResults);
    }
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => navigation.navigate('VideoDetailScreen', { video: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultDuration}>{item.duration}</Text>
          <Text style={styles.resultViews}>{item.views} views</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <FontAwesome name="download" size={16} color="#2b8eff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultsSection}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome name="search" size={60} color="#666" />
            <Text style={styles.emptyText}>Search for videos to get started</Text>
          </View>
        )}
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a1a2a',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 15,
  },
  searchButton: {
    backgroundColor: '#2b8eff',
    padding: 10,
    borderRadius: 20,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#0a1a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 15,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultDuration: {
    color: '#ccc',
    fontSize: 14,
    marginRight: 15,
  },
  resultViews: {
    color: '#ccc',
    fontSize: 14,
  },
  downloadButton: {
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Search; 