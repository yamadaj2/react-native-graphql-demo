import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors, {themeBlue, white} from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useEffect} from 'react';
import AuthLoading from '../screens/AuthLoading';
import {useQuery} from '@apollo/react-hooks';
import {PROFILE_QUERY} from '../graphql/auth/authQuery';
import CircleDropdown from '../components/circleDropdown';
import {logout} from '../utilities/authUtilities';

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const HomeStack = props => {
  return <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={() => ({
        headerTitle: 'Available Movies',
        headerRight: () => profileMenu(props),
      })}
    />
  </Stack.Navigator>
}

const ProfileStack = props => {
  return <Stack.Navigator>
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
      options={() => ({
        headerRight: () => profileMenu(props)
      })}
    />
  </Stack.Navigator>
}

export default function BottomTabNavigator({navigation}) {
  const colorScheme = useColorScheme();
  useEffect(() => navigation?.setOptions({headerShown: false}), []);

  const {data} = useQuery(PROFILE_QUERY, {
    fetchPolicy: 'network-only',
  });

  return (
    <BottomTab.Navigator tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name='Profile'
        component={ProfileStack}
        options={() => ({
          tabBarIcon: ({color}) => <TabBarIcon name='md-person' color={color}/>
        })}
      />

      {
        data &&
        <BottomTab.Screen
          name='Movies'
          initialParams={data}
          component={HomeStack}
          options={{
            tabBarIcon: ({color}) => <TabBarIcon name='md-film' color={color}/>,
          }}
        />
      }
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const profileMenu = ({navigation}) => {
  let name = '';
  try { name = navigation.dangerouslyGetState()?.routes?.find(route => route.name === 'Movies')?.params?.currentUser.username || '';
  } catch (e) {console.error(e)}

  return <CircleDropdown
    text={name[0]?.toUpperCase()}
    textColor={white}
    backgroundColor={themeBlue}
    onPress={() => {
      const logoutRequested = confirm('Are you sure you want to logout?')
      if (logoutRequested) logout().then(() => navigation.replace('Login'))
    }}
  />
}