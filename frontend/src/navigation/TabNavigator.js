import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

// Screens
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NewsScreen from '../screens/NewsScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

// Dummy screen used for the Camera tab (we show a modal instead)
const DummyScreen = () => <View style={{ flex: 1, backgroundColor: '#1a1a1a' }} />;

export default function TabNavigator() {
  const navigation = useNavigation();
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission denied!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 });
    if (!result.canceled) {
      navigation.navigate('Chat', {
        image: result.assets[0],
        prompt: '',
      });
    }
    setCameraModalVisible(false);
  };

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.7 });
    if (!result.canceled) {
      navigation.navigate('Chat', {
        image: result.assets[0],
        prompt: '',
      });
    }
    setCameraModalVisible(false);
  };


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
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          tabBarStyle,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true, 
        }}
        screenListeners={{
          tabPress: (e) => {
            const isCameraTab = e.target?.includes('Camera');
            if (isCameraTab) {
              e.preventDefault(); // Stop default navigation
              setCameraModalVisible(true); // Show camera modal
            }
          },
        }}
      >
        <Tab.Screen
          name="Location"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../../assets/pictures/navbar/7.png')} style={{ width: 35, height: 35, tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../../assets/pictures/navbar/6.png')} style={{ width: 35, height: 35, tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={DummyScreen} // Dummy screen to intercept tabPress
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../../assets/pictures/navbar/4.png')} style={{ width: 35, height: 35, tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../../assets/pictures/navbar/3.png')} style={{ width: 35, height: 35, tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image source={require('../../assets/pictures/navbar/2.png')} style={{ width: 35, height: 35, tintColor: color }} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Modal for Camera / Gallery options */}
      <Modal
        visible={cameraModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCameraModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 24,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>What would you like to do?</Text>

            <TouchableOpacity onPress={handleCamera} style={{
              padding: 16,
              backgroundColor: '#49441f',
              borderRadius: 12,
              marginBottom: 12,
            }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGallery} style={{
              padding: 16,
              backgroundColor: '#ddd',
              borderRadius: 12,
            }}>
              <Text style={{ textAlign: 'center' }}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCameraModalVisible(false)} style={{ padding: 16, marginTop: 10 }}>
              <Text style={{ textAlign: 'center', color: '#666' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}