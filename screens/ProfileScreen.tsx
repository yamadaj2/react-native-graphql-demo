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
import {white} from '../constants/Colors';
import {showMessage} from 'react-native-flash-message';
import {PROFILE_QUERY} from '../graphql/auth/authQuery';

export default function ProfileScreen({navigation}) {
  const {data, loading, error} = useQuery(PROFILE_QUERY, {fetchPolicy: 'network-only'})
  if (loading) return <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />
  if (error) {
    showMessage({message: error.message, type: 'danger'})
    return
  }
  if (!data || !data.currentUser) return <Text style={{textAlign: 'center'}}>No Data</Text>;


  const {currentUser: {email, votes}} = data;
  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Text>{email}</Text>
      </View>
      {votes?.length > 0 ?
        <FlatList
          data={votes}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item: {movie}}) => <MoviePoster movie={movie} onPress={() => navigation.navigate('Detail', {movie})} /> }
        />
        :
        <Text style={styles.noResults}>
          No Votes Yet
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: white,
  },
  noResults: {
    textAlign: 'center',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  saveIcon: {
    position: 'relative',
    right: 20,
    zIndex: 8,
  }
})