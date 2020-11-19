import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {lightBlack, themeBlue, white} from '../../constants/Colors';
import React, {useState} from 'react';
import RoundedButton from '../RoundedButtons';
import {Ionicons} from '@expo/vector-icons';
import {showMessage} from 'react-native-flash-message';
import {useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGN_UP_MUTATION} from '../../graphql/authMutation';

const {width} = Dimensions.get('window');

export default function SignUpForm({ navigation } : any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    async onCompleted({signUp}) {
      const {token} = signUp;
      try {
        await AsyncStorage.setItem('token', token);
        navigation.replace('Profile')
      } catch (e) { console.error(e) }
    }
  });

  const handleSignUp = () =>
    signUp({variables: {username, email, password}})
      .catch(({message}) => {
        showMessage({message, type: 'danger'})
      })

  return (
    <View>
      <View>
        <TextInput
          onChange={({target: {value}}) => setUsername(value)}
          value={username}
          placeholder='Username'
          placeholderTextColor={lightBlack}
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.input}
        />
        <TextInput
          onChange={({target: {value}}) => setEmail(value)}
          value={email}
          placeholder='Email'
          placeholderTextColor={lightBlack}
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.input}
        />
        <TextInput
          onChange={({target: {value}}) => setPassword(value)}
          value={password}
          placeholder='Password'
          placeholderTextColor={lightBlack}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text='Sign Up'
          icon={<Ionicons name='md-checkmark-circle' size={20} color={white} style={styles.saveIcon}/>}
          textColor={white}
          backgroundColor={themeBlue}
          onPress={() => handleSignUp()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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