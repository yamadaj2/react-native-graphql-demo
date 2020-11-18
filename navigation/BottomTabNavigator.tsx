import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import HomeScreen from "../screens/HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import AuthLoading from "../screens/AuthLoading";

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{headerTitle: 'Now Playing'}}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='AuthLoading'
        component={AuthLoading}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <Ionicons
              color='#161616'
              name='md-exit'
              onPress={async () => {
                await AsyncStorage.removeItem('token');
                navigation.replace('Login')
              }}
              size={25}
              style={{position: 'relative', left: 20, zIndex: 8}}
            />
          )
        })}
      />
    </Stack.Navigator>
  )
}

export default function BottomTabNavigator({navigation}) {
  const colorScheme = useColorScheme();
  useEffect(() => navigation?.setOptions({headerShown: false}), [])

  return (
    <BottomTab.Navigator tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='md-person' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Movies'
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='md-film' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}