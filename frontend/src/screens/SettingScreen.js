import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import { useLayoutEffect } from 'react';

export default function SettingsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const handleClearCache = () => {
    alert('🧹 Cache cleared');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };
  const handleWaypoints = () => {
    navigation.navigate('Waypoints');
  };

  const handleLogout = () => {
    alert('🚪 Logged out');
    navigation.replace('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#49441f',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 24,
        paddingBottom: 80, // Leaves space for tab bar
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 60,
          left: 20,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>Back</Text>
      </TouchableOpacity>

      {/* Massive Logo */}
      <Image
        source={require('../../assets/images/logo-white.png')}
        style={{
          width: '100%',
          height: 220,
          resizeMode: 'contain',
          marginBottom: 12, // Lift settings up
        }}
      />

      {/* Raised and Shorter Settings Panel */}
      <View
        style={{
          backgroundColor: '#ffff',
          width: '100%',
          borderRadius: 28,
          padding: 28,
          paddingBottom: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
          justifyContent: 'flex-start',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: 28,
          }}
        >
          Settings
        </Text>



        <TouchableOpacity
          onPress={handleProfile}
          style={{
            backgroundColor: '#2b2b2b',
            paddingVertical: 20,
            borderRadius: 14,
            marginBottom: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            👤 View / Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleWaypoints}
          style={{
            backgroundColor: '#2b2b2b',
            paddingVertical: 20,
            borderRadius: 14,
            marginBottom: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            📍 Edit Waypoints
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#2b2b2b',
            paddingVertical: 20,
            borderRadius: 14,
            marginBottom: 4,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            🚪 Log Out
          </Text>
        </TouchableOpacity>
        </View>
      {/* Light footer still above nav bar */}
      <View style={{ marginTop: 28, alignItems: 'center' }}>
        <Text style={{ color: '#ccc', fontSize: 16 }}>Neo Eden v1.0.0</Text>
        <Text style={{ color: '#aaa', fontSize: 14 }}>Updated Apr 12, 2025</Text>
      </View>
    </ScrollView>
  );
}

