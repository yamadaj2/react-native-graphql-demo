import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

export default function AuthLoadingScreen({navigation}) {
  useEffect(() => { bootstrapAsync() }, [])

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    navigation.replace(userToken ? 'Profile' : 'Login');
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}