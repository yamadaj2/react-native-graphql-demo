import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MoviePoster from '../components/MoviePoster';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const PROFILE_QUERY = gql`
    query {
        currentUser {
            id
            votes {
                id
                movie {
                    id
                    title
                    imageUrl
                    description
                    category {
                        title
                    }
                }
            }
        }
    }
`;

export default function ProfileScreen({navigation}) {
  const {data, loading, error} = useQuery(PROFILE_QUERY, {
    //latest data only
    fetchPolicy: 'network-only',
  })

  if (!data || !data.currentUser) return <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />

  const {currentUser} = data;
  const {username, email, votes} = currentUser;
  return (
    <View style={styles.container}>
      {votes?.length > 0 ? (
          <FlatList
            data={votes}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item: {movie}}) => <MoviePoster onPress={() => navigation.navigate('Detail', {movie})} movie={movie}/> }
          />
        ) :
        <View>
          <Text style={styles.noResults}>
            No Votes Yet
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  noResults: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveIcon: {
    position: 'relative',
    right: 20,
    zIndex: 8,
  }
})