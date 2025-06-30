import React from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';

const cast = [
  { name: 'HoYeon Jung', image: require('../../assets/Intro1.png') },
  { name: 'Lee Jung-jae', image: require('../../assets/Intro1.png') },
  { name: 'Gong Yoo', image: require('../../assets/Intro1.png') },
  { name: 'Lee Yoo-Mi', image: require('../../assets/Intro1.png') },
  { name: 'Park Hae-soo', image: require('../../assets/Intro1.png') },
];

const CardCastList = () => {
  return (
    <FlatList
      data={cast}
      horizontal
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 15 }}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default CardCastList;

const styles = StyleSheet.create({
  item: { alignItems: 'center', marginRight: 15 },
  image: { width: 60, height: 60, borderRadius: 30 },
  name: { color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 5 },
}); 