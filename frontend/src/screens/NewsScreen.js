import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView, Text } from 'react-native';

export default function NewsScreen() {
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
        placeholder="Search updates..."
        placeholderTextColor="#999"
        style={styles.searchInput}
      />

      {/* News content */}
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>Latest Updates</Text>
            <Text style={styles.newsDate}>March 19, 2024</Text>
            <Text style={styles.newsText}>
              Welcome to Neo Eden! Stay tuned for the latest updates and announcements.
            </Text>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  newsItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4A4522',
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  newsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});