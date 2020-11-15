import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import RoundedButton from '../components/RoundedButtons';
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get('window');
interface Props {
  navigation: Object,
  route: {
    params: {
      movie: {
        title: String,
        description: String,
        imageUrl: String,
        category: {
          title: String,
        }
      }
    }
  }
}

export default function Detail({route }: Props) {
  const { params } = route;
  const { movie } = params;
  const {title, description, imageUrl, category} = movie;
  const isFavorite = false;
  const primaryColor = isFavorite ? 'rgba(25, 148, 214, 1)' : '#fff';
  const secondaryColor = isFavorite ? '#fff' : 'rgba(75, 148, 214, 1)';
  const saveString = isFavorite ? 'Remove Vote' : 'Add Vote';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: imageUrl}}/>
        <Text numberOfLines={2} style={[styles.text, {textAlign: 'center'}]}>
          {title}
        </Text>
        <RoundedButton
          text={saveString}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          onPress={() => console.log('pressed')}
          icon={
            <Ionicons
              name='md-checkmark-circle'
              size={20}
              color={primaryColor}
              style={styles.saveIcon}
            />
          }
        />
        <View style={styles.statRow}>
          <Text style={styles.stat}>Category</Text>
          <Text style={styles.stat}>{category.title}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width,
    height: width,
  },
  saveIcon: {
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  stat: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '700',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 24,
    color: '#161616',
    paddingBottom: 15,
  },
})