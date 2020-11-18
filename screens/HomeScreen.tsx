import * as React from 'react';
import {StyleSheet, View, FlatList, Button, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Tag from '../components/Tag';

interface Props {
  navigation: {
    navigate: Function,
  },
}

import MoviePoster from '../components/MoviePoster';
import {useState} from "react";

const FEED_QUERY = gql`
    query Feed($categoryId: ID) {
        feed(categoryId: $categoryId) {
            id
            title
            description
            category {
                id
                title
            }
            imageUrl
        }
    }
`;

const CATEGORY_QUERY = gql`
    query {
        categories {
            id
            title
        }
    }
`

export default function HomeScreen(props: Props) {
  const [categoryId, setCategoryId] = useState(0);
  const {data, refetch, error, loading} = useQuery(FEED_QUERY, {
    variables: categoryId ? {categoryId}: {},
    fetchPolicy: 'cache-and-network',
  });

  const {data: genres} = useQuery(CATEGORY_QUERY);
  const {navigation} = props;

  if (loading || !data || !data.feed) {
    console.error(error);
    return <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />
  }

  return (
    <View style={styles.container}>
      <View>
        {genres &&
        <FlatList
          data={genres.categories}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          extraData={categoryId}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            const selected = categoryId == item.id;
            return <Tag key={item.id} selected={selected} title={item.title} onPress={() => {
              if (selected) {
                setCategoryId(0);
                refetch();
              } else {
                setCategoryId(parseInt(item.id))
                refetch();
              }}
            }
            />
          }}
        />
        }
      </View>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={data.feed}
        keyExtractor={({title}) => title}
        numColumns={2}
        ListEmptyComponent={(genres && categoryId) && <View style={styles.noResults}>No results with genre: "{genres?.categories[categoryId - 1]?.title}" found</View>}
        renderItem={({ item }) => <MoviePoster movie={item} onPress={() => navigation.navigate('Detail', { movie: item }) } />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 10,
  }
})