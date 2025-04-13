import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from '../screens/NewsScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navbar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/pictures/navbar/7.png')}
              style={[styles.icon, focused && styles.activeIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/pictures/navbar/6.png')}
              style={[styles.icon, focused && styles.activeIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerButton}>
              <Image
                source={require('../../assets/pictures/navbar/4.png')}
                style={[styles.centerIcon, focused && styles.activeIcon]}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/pictures/navbar/3.png')}
              style={[styles.icon, focused && styles.activeIcon]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/pictures/navbar/2.png')}
              style={[styles.icon, focused && styles.activeIcon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#4A4522',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
    opacity: 0.7,
  },
  activeIcon: {
    opacity: 1,
  },
  centerButton: {
    backgroundColor: '#4A4522',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  centerIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
});



