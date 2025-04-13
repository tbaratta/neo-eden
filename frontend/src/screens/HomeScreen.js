import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/logo-white.png')}
        style={styles.logo}
      />

      {/* Search bar */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for something..."
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

      {/* Main content area */}
      <View style={styles.content}>
        {/* Add your home screen content here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4522',
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
});
