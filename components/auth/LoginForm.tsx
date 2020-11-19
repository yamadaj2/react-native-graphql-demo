import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {lightBlack, themeBlue, white} from '../../constants/Colors';
import React, {useState} from 'react';
import RoundedButton from '../RoundedButtons';
import {Ionicons} from '@expo/vector-icons';
import {showMessage} from 'react-native-flash-message';
import {useMutation} from '@apollo/react-hooks';
import {SIGN_IN_MUTATION} from '../../graphql/authMutation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

export default function LoginForm({ navigation } : any) {
  const [username, setUsername] = useState('');
  const [nameCredentials, setNameCredentials] = useState('');
  const [password, setPassword] = useState('');

  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    async onCompleted({signIn}) {
      const {token} = signIn;
      try {
        await AsyncStorage.setItem('token', token);
        navigation.replace('Profile')
      } catch (e) { console.error(e) }
    }
  });

  const handleLogin = () => {
    const isEmail = nameCredentials?.includes('@');
    const params = isEmail ? {email: nameCredentials, password} : {username: nameCredentials, password};

    signIn({variables: params}).catch(({message}) => {
      showMessage({message, type: 'danger'})
    })
  }

  return (
    <View style={styles.inputContainer}>
      <View>
        <TextInput
          onChange={({target: {value}}) => setNameCredentials(value)}
          value={nameCredentials}
          placeholder='Email/Username'
          placeholderTextColor={lightBlack}
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
          placeholderTextColor={lightBlack}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text='Login'
          icon={<Ionicons name='md-checkmark-circle' size={20} color={white} style={styles.saveIcon}/>}
          textColor={white}
          backgroundColor={themeBlue}
          onPress={handleLogin}
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
    flex: 0.3,
    justifyContent: 'space-between',
  },
  input: {
    width: width - 40,
    height: 40,
    borderBottomWidth: 1,
  },
})