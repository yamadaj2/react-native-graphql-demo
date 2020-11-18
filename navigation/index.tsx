import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import Detail from '../screens/MovieDetail';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name='Root' component={BottomTabNavigator} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen
          name='NotFound'
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}