import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/styles';
import NavBar from '../navigation/TabNavigator';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo-white.png')} style={[styles.logo, { marginTop: 60 }]} />

      {/* Search bar (working TextInput) */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for something..."
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

      {/* Map Placeholder stretched */}
      <View style={styles.mapContainer} />

      {/* NavBar pinned to bottom */}
      <NavBar onChatPress={() => navigation.navigate('Chat')} />
    </View>
  );
}
