import * as React from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator, Text} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import Tag from '../components/Tag';
import MoviePoster from '../components/MoviePoster';
import {useState} from "react";
import {themeBlue, white} from "../constants/Colors";
import {showMessage} from 'react-native-flash-message';
import {FEED_QUERY} from '../graphql/feed/feedQuery';
import {CATEGORY_QUERY} from '../graphql/category/categoryQuery';

interface Props {
  navigation: {
    navigate: Function,
  },
}

export default function HomeScreen({navigation}: Props) {
  const [categoryId, setCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null)

  const {data: genres} = useQuery(CATEGORY_QUERY);
  const {data, refetch, error, loading} = useQuery(FEED_QUERY, {
    variables: categoryId ? {categoryId}: {},
    fetchPolicy: 'cache-and-network',
  });


  if (loading || !data || !data.feed) return <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />
  if (error) {
    showMessage({message: error.message, type: 'danger'})
    return
  }

  const displayResultsMessage = () => {
    let message;
    if (data?.feed?.length > 0) {
      message = 'Showing results for: ';
    } else {
      message = 'No results found for: '
    }

    return (
      <View style={styles.resultsContainer}>
        <Text>{message}</Text>
        <Text>{selectedCategory?.title}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        {genres &&
        <FlatList
          data={genres.categories}
          extraData={categoryId}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const selected = (categoryId == item.id);
            return (
              <Tag key={item.id} selected={selected} title={item.title} onPress={() => {
                setCategoryId(selected ? 0 : parseInt(item.id));
                setSelectedCategory(!selected && item)
                refetch();
              }}/>
            )
          }}
          showsHorizontalScrollIndicator={false}
        />
        }
      </View>
      {selectedCategory && displayResultsMessage()}
      {
        data?.feed?.length > 0 &&
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={data.feed}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item: movie}) => <MoviePoster movie={movie} onPress={() => navigation.navigate('Detail', {movie})}/>}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  selectedCategory: {
    backgroundColor: themeBlue,
    borderRadius: 20,
    color: white,
    marginLeft: 10,
    padding: 5,
    textAlign: 'center',
    width: '20%',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 10,
  }
})