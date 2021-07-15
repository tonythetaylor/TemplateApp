// Import React
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import FeedScreen from './DrawerScreens/FeedScreen';

import CameraScreen from './Camera';

import CustomSidebarMenu from './components/CustomSidebarMenu';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';
import { Button } from './components/Button';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// toggle camera visibility 
const cameraVisibility = (route) => {
  let tabBarVisibility = route.name === 'Camera' ? false : true
  return tabBarVisibility
};

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Feed':
        iconName = 'chatbubbles-outline';
        break;
      case 'Camera':
        iconName = 'camera';
        break;
      default:
        break;
    }
  
    return <Ionicons name={iconName} color={color} size={24} />;
  };

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#4c669f', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#4c669f', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const feedScreenStack = ({route, navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Feed', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <Button
              text="New Status"
              onPress={() => navigation.navigate('NewStatus')}
            />
          ),
          headerStyle: {
            backgroundColor: '#4c669f', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const cameraScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: 'Camera', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <Button
              text="New Status"
              onPress={() => navigation.navigate('NewStatus')}
            />
          ),
          headerStyle: {
            backgroundColor: 'transparent', //Set Header color
          },
          headerTransparent: true,
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabFeed = (props) => {
    return (
        <Tab.Navigator initialRouteName="Feed"
        screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
            tabBarVisible: cameraVisibility(route)
          })}
        tabBarOptions={{
            showLabel: false,
            activeTintColor: '#fff',
            inactiveTintColor: 'lightgray',
            activeBackgroundColor: '#3b5998',
            inactiveBackgroundColor: '#4c669f',
                style: {
                      backgroundColor: '#4c669f',
                      paddingBottom: 0
                }
         }}>
        <Tab.Screen name="Home" component={homeScreenStack} />
        <Tab.Screen name="Camera" component={cameraScreenStack} />
        <Tab.Screen name="Feed" component={feedScreenStack} />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabFeed;