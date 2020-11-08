import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const cols = 2, rows = 2;

export default function MoviePoster(props) {
  const {onPress, movie, movie: {title, category, imageUrl}} = props;
  return (
    <TouchableOpacity
      onPress={onPress && onPress()}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageUrl}} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.genre}>{category.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  genre: {
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
  image: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginTop: 4,
  },
})