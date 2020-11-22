import AsyncStorage from '@react-native-async-storage/async-storage';

export const signUp = token => new Promise((resolve, reject) => {
  try { resolve(AsyncStorage.setItem('token', token)) }
  catch (e) {
    console.error(e)
    reject(e)
  }
})

export const logIn = token => new Promise((resolve, reject) => {
  try { resolve(AsyncStorage.setItem('token', token)) }
  catch (e) {
    console.error(e)
    reject(e)
  }
})

export const logout = () => new Promise((resolve, reject) => {
  try { resolve(AsyncStorage.removeItem('token'))}
  catch (e) {
    console.error(e);
    reject(e)
  }
})