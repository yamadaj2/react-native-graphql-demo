import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions, ActivityIndicator,
} from 'react-native';
import RoundedButton from '../components/RoundedButtons';
import {Ionicons} from '@expo/vector-icons';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {lightBlack, themeBlue, white} from '../constants/Colors';
import {PROFILE_QUERY} from '../graphql/auth/authQuery';
import {ADD_VOTE, REMOVE_VOTE} from '../graphql/votes/voteMutations';
import {showMessage} from 'react-native-flash-message';

const {width} = Dimensions.get('window');
interface Props {
  navigation: Object,
  route: {
    params: {
      movie: {
        id: Number,
        title: String,
        description: String,
        imageUrl: String,
        category: {
          id: Number,
          title: String,
        }
      }
    }
  }
}

export default function Detail({route }: Props) {
  const {data, refetch, loading} = useQuery(PROFILE_QUERY);
  const [addVote] = useMutation(ADD_VOTE);
  const [removeVote] = useMutation(REMOVE_VOTE);
  const [submitted, setSubmitted] = useState(false);

  const {params: {movie: {id, title, description, imageUrl, category}}} = route;

  const isFavorite = !!(data?.currentUser?.votes.find(({movie}) => movie.id === id))
  const primaryColor = isFavorite ? themeBlue : white;
  const secondaryColor = isFavorite ? white : themeBlue;
  const submitText = `${isFavorite ? 'Remove' : 'Add'} Vote`;
  const voteButtonDisabled = loading || submitted;

  const toggleVote = () => {
    setSubmitted(true)
    if (!loading) {
      const params = {variables: {movieId: id}};
      const errorMessage = e => {
        console.error(e)
        showMessage({message: 'Something went wrong', type: 'danger'})
      }

      if (isFavorite) {
        removeVote(params)
          .then(refetch)
          .catch(e => errorMessage(e))
          .finally(() => setSubmitted(false))
      } else {
        addVote(params)
          .then(refetch)
          .catch(e => errorMessage(e))
          .finally(() => setSubmitted(false))
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: imageUrl}}/>
        <Text numberOfLines={2} style={[styles.text, {textAlign: 'center'}]}>
          {title}
        </Text>

        <RoundedButton
          text={voteButtonDisabled ? <ActivityIndicator /> : submitText}
          disabled={voteButtonDisabled}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          onPress={toggleVote}
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
    color: lightBlack,
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
    color: lightBlack,
    paddingBottom: 15,
  },
})