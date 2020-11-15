import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
const cols = 2, rows = 2;

interface Props {
  onPress: any,
  movie: {
    title: string,
    category: {
      title: string,
    },
    imageUrl: string
  }
}

const propTypes = {
  onPress: PropTypes.func,
  movie: PropTypes.object,
}

const defaultProps = {
  onPress: () => console.log('onPress'),
  movie: {
    title: 'movie',
    category: {
      title: 'title',
    },
    imageUrl: 'https://picsum.photos/400/500'
  }
}

export default function MoviePoster(props: Props) {
  const {onPress, movie: {title, category, imageUrl}} = props;
  const {container, genre,image, imageContainer, titles} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={container}>
      <View style={imageContainer}>
        <Image style={image} source={{uri: imageUrl}} />
      </View>
      <Text style={titles}>{title}</Text>
      <Text style={genre}>{category.title}</Text>
    </TouchableOpacity>
  )
}

MoviePoster.propTypes = propTypes
MoviePoster.defaultProps = defaultProps

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
  titles: {
    fontSize: 14,
    marginTop: 4,
  },
})