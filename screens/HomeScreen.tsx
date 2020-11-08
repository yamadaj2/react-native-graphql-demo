import * as React from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList} from 'react-native'

import MoviePoster from '../components/MoviePoster';

const movies = [
  {
    'title': 'Spider-Man: Far From Hone',
    'description': 'Peter Parker visits Europe with his friends',
    'imageUrl': 'https://picsum.photos/600/600',
    'category': {
      'title': 'Action',
    }
  }
]

export default function HomeScreen(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => <MoviePoster movie={item} onPress={() => navigation.navigate('Detail', { movie: item })}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 10,
  }
})