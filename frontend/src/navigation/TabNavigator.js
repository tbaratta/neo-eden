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
    bottom: 0,
    left: 120,
    right: 120,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 85,
  };

  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          tabBarStyle,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
    >
      <Tab.Screen
          name="Location"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '105%' }}>
                <Image source={require('../../assets/pictures/navbar/7.png')} style={{ width: 30, height: 30, tintColor: color, top: 12  }} />
              </View>
            ),
          }}
        />
      <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '105%' }}>
                <Image source={require('../../assets/pictures/navbar/6.png')} style={{ width: 30, height: 30, tintColor: color, top: 12 }} />
              </View>
            ),
          }}
        />
     <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarIcon: () => (
              <View
                style={{
                  position: 'absolute',
                  top: -30, // floats above tab bar
                  width: 90,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Image
                  source={require('../../assets/pictures/navbar/4.png')}
                  style={{ width: 35, height: 35, tintColor: '#49441f' }}
                />
              </View>
            ),
          }}
        />
     <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '105%' }}>
                <Image source={require('../../assets/pictures/navbar/3.png')} style={{ width: 30, height: 30, tintColor: color, top: 12  }} />
              </View>
            ),
          }}
        />
 
 <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '105%' }}>
                <Image source={require('../../assets/pictures/navbar/2.png')} style={{ width: 30, height: 30, tintColor: color, top: 12  }} />
              </View>
            ),
          }}
        />
    </Tab.Navigator>
  );
};

export default TabNavigator;