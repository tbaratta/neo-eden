import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';

// Import screens
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NewsScreen from '../screens/NewsScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabBarStyle = {
    position: 'absolute',
    bottom: 20,
    left: 120,
    right: 120,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 75,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        tabBarStyle: tabBarStyle,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Location"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // Location Icon - Replace with your image

            <Image
              source={require('../../assets/pictures/navbar/7.png')}
              style={{ width: 35, height: 35, tintColor: color }}
              onError={() => console.error("Failed to load location icon")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // News Icon - Replace with your image
            <Image
              source={require('../../assets/pictures/navbar/6.png')}
              style={{ width: 35, height: 35, tintColor: color }}
              onError={() => console.error("Failed to load location icon")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // Camera Icon - Replace with your image
            <Image
              source={require('../../assets/pictures/navbar/4.png')}
              style={{ width: 35, height: 35, tintColor: color }}
              onError={() => console.error("Failed to load location icon")}
            
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // Chat Icon - Replace with your image
            <Image
              source={require('../../assets/pictures/navbar/3.png')}
              style={{ width: 35, height: 35, tintColor: color }}
              onError={() => console.error("Failed to load location icon")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // Settings Icon - Replace with your image
            <Image
              source={require('../../assets/pictures/navbar/2.png')}
              style={{ width: 35, height: 35, tintColor: color }}
              onError={() => console.error("Failed to load location icon")}
              screenOptions={{headerShown: false}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;



