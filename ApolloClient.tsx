import { ApolloClient } from 'apollo-client';
import {InMemoryCache } from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, Observable} from 'apollo-link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from 'react-native-dotenv';

const httpLink = new HttpLink({
  credentials: 'include',
  uri: BASE_URL,
})

const request = async (operation: any) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token && `Bearer ${token}`,
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => handle && handle.unsubscribe()
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([requestLink, httpLink]),
  cache: new InMemoryCache()
})

export default client;