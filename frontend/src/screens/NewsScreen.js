import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_URL } from '../config/api';
import * as Location from 'expo-location';

export default function NewsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [searchText, setSearchText] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    location: null
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/news`);
      const data = await response.json();
      console.log('Fetched news:', data); // Debug log
      setNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = async () => {
    try {
      // Validate inputs
      if (!newArticle.title.trim() || !newArticle.description.trim()) {
        alert('Please fill in both title and description');
        return;
      }

      // Get current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Current location:', location); // Debug log
      
      const newsData = {
        title: newArticle.title.trim(),
        description: newArticle.description.trim(),
        location: {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude]
        },
        createdAt: new Date()
      };

      console.log('Sending news data:', newsData); // Debug log

      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newsData)
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to create news article');
      }

      const result = await response.json();
      console.log('Creation success:', result); // Debug log

      // Refresh news list and close modal
      await fetchNews();
      setModalVisible(false);
      setNewArticle({ title: '', description: '', location: null });
      alert('News article created successfully!');
    } catch (error) {
      console.error('Detailed error:', error); // Debug log
      alert('Error creating news article: ' + (error.message || 'Unknown error occurred'));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with logo and action buttons */}
      <Image
        source={require('../../assets/images/logo-white.png')}
        style={[styles.logo, { height: 80 }]} // slightly bigger
      />

      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // ***************************
            // TODO: Hook up actual filter modal or sorting logic
            // yoooo jordan i think you would be good at this :)
            // ***************************
            alert('Filter toggle coming soon!');
          }}
        >
          <MaterialCommunityIcons name="filter-variant" size={24} color="#fff" />
          <Text style={styles.buttonLabel}>Sort Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.buttonLabel}>Add Report</Text>
        </TouchableOpacity>
      </View>

      {/* News content */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#4A4522" style={styles.loader} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {news.map((item, index) => (
              <TouchableOpacity key={item._id || index} style={styles.newsItem}>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <View style={styles.newsMetadata}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                    <Text style={styles.locationText}>
                      {item.location ? `${item.location.coordinates[1].toFixed(4)}, ${item.location.coordinates[0].toFixed(4)}` : 'Location N/A'}
                    </Text>
                    <Text style={styles.newsDate}>{formatDate(item.createdAt)}</Text>
                  </View>
                  <Text style={styles.newsText} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Create News Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create News Article</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={newArticle.title}
              onChangeText={(text) => setNewArticle({...newArticle, title: text})}
            />
            
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={newArticle.description}
              onChangeText={(text) => setNewArticle({...newArticle, description: text})}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleCreateNews}
              >
                <Text style={styles.submitButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4522',
  },
  logo: {
    width: '100%',
    height: 37,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#4A4522',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  newsItem: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4522',
    marginBottom: 8,
  },
  newsMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 10,
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
  },
  newsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4A4522',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4522',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#4A4522',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A4522',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A4522',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
  },
});