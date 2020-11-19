import React, {useState} from 'react';
import {Dimensions, StyleSheet, View,} from 'react-native';
import RoundedButton from '../components/RoundedButtons';
import {themeBlue, white} from '../constants/Colors';
import SignUpForm from '../components/auth/SignUpForm';
import LoginForm from '../components/auth/LoginForm';

const {width} = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  const [login, setLogin] = useState(false);

  return (
    <View style={styles.container}>
      {login ? <SignUpForm navigation={navigation} /> : <LoginForm navigation={navigation}/> }
      <RoundedButton
        backgroundColor={white}
        onPress={() => setLogin(!login)}
        text={login ? 'Have an account? Log In' : 'Need an account? Sign Up'}
        textColor={themeBlue}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: white,
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