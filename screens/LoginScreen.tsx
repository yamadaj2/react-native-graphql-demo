import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/react-hooks';
import {Ionicons} from '@expo/vector-icons';
import gql from 'graphql-tag';
import RoundedButton from '../components/RoundedButtons';

const {width} = Dimensions.get('window');

const SIGN_UP_MUTATION  = gql`
    mutation SignUp($username:String!, $email:String!, $password:String!){
        signUp(username: $username, email: $email, password: $password) {
            user {
                id
                username
                email
            }
            token
        }
    }
`;

const SIGN_IN_MUTATION = gql`
    mutation SignIn($username:String, $email:String, $password:String!) {
        signIn(email:$email, username:$username, password:$password) {
            user {
                id
                username
                email
            }
            token
        }
    }
`;

export default function LoginScreen({ navigation } : any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    async onCompleted({signIn}) {
      const {token} = signIn;
      try {
        await AsyncStorage.setItem('token', token);
        navigation.replace('Profile')
      } catch (e) { console.error(e) }
    }
  });

  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    async onCompleted({signUp}) {
      const {token} = signUp;
      try {
        await AsyncStorage.setItem('token', token);
        navigation.replace('Profile')
      } catch (e) { console.error(e) }
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {!login && (
          <View>
            <TextInput
              onChange={({target: {value}}) => setUsername(value)}
              value={username}
              placeholder='Username'
              placeholderTextColor='#161616'
              autoCorrect={false}
              autoCapitalize='none'
              style={styles.input}
            />
          </View>
        )}

        <View>
          <TextInput
            onChange={({target: {value}}) => setEmail(value)}
            value={email}
            placeholder={login ? 'Email/Username' : 'Email'}
            placeholderTextColor='#161616'
            autoCorrect={false}
            autoCapitalize='none'
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            onChange={({target: {value}}) => setPassword(value)}
            value={password}
            placeholder='Password'
            placeholderTextColor='#161616'
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={login ? 'Login' : 'Sign Up'}
            icon={<Ionicons name='md-checkmark-circle' size={20} color='#fff' style={styles.saveIcon}/>}
            textColor='#fff'
            backgroundColor='rgba(75, 148, 214, 1)'
            onPress={() => {
              if (login) {
                const isEmail = email?.includes('@');
                isEmail ? signIn({variables: {email, password}}) : signIn({variables: {email, username, password}})
              } else {
                signUp({variables: {username, email, password}})
              }
            }}
          />

          <RoundedButton
            text={login ? 'Need an account ? Sign Up' : 'Have an account? Log In'}
            icon={<Ionicons name='md-information-circle' size={20} color='rgba(75, 148, 214, 1)' style={styles.saveIcon} />}
            textColor='rgba(75, 148, 214, 1)'
            backgroundColor='#fff'
            onPress={() => setLogin(!login)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
  },
  saveIcon: {
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: 'space-between',
  },
  input: {
    width: width - 40,
    height: 40,
    borderBottomWidth: 1,
  },
})