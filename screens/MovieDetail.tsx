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
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {lightBlack, themeBlue, white} from '../constants/Colors';

const PROFILE_QUERY = gql`
    query {
        currentUser {
            id
            username
            email
            votes {
                id
                movie {
                    id
                    title
                    imageUrl
                    description
                    category {
                        id
                        title
                    }
                }
            }
        }
    }
`;

const ADD_VOTE = gql`
    mutation AddVote($movieId: ID!) {
        addVote(movieId: $movieId)
    }
`;

const REMOVE_VOTE = gql`
    mutation RemoveVote ($movieId: ID!) {
        removeVote(movieId: $movieId)
    }
`;

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
  const {data, refetch} = useQuery(PROFILE_QUERY);
  const [addVote] = useMutation(ADD_VOTE);
  const [removeVote] = useMutation(REMOVE_VOTE);

  const { params } = route;
  const { movie } = params;
  const {id, title, description, imageUrl, category} = movie;
  const isFavorite = data?.currentUser?.votes && data?.currentUser?.votes.find(vote => vote.movie.id === id);
  const primaryColor = isFavorite ? themeBlue : white;
  const secondaryColor = isFavorite ? white : themeBlue;
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
          onPress={() => {
            if (isFavorite) {
              removeVote({variables: {movieId: id}})
                .then(() => refetch())
                .catch(e => console.error(e))
            } else {
              addVote({variables: {movieId: id}})
                .then(() => refetch())
                .catch(e => console.error(e))
            }
          }}
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