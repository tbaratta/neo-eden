import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import NavBar from '../navigation/TabNavigator';

const alerts = [
  {
    id: '1',
    title: 'Radiation spike detected',
    location: 'Sector 3B',
    timestamp: 'Apr 12, 2025 • 1:42 PM',
    distance: 2.5,
  },
  {
    id: '2',
    title: 'Hostile group spotted',
    location: 'Old Mall Entrance',
    timestamp: 'Apr 12, 2025 • 1:10 PM',
    distance: 1.2,
  },
  {
    id: '3',
    title: 'Contaminated water report',
    location: 'Riverbank Zone 5',
    timestamp: 'Apr 12, 2025 • 12:38 PM',
    distance: 4.7,
  },
];

export default function NewsScreen() {
  const [sortBy, setSortBy] = useState('recent');

  const handleSubmitReport = () => {
    alert('Feature coming soon: Submit your own report!');
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (sortBy === 'proximity') return a.distance - b.distance;
    return b.timestamp.localeCompare(a.timestamp);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Latest Reports</Text>

        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setSortBy('recent')}
            style={[styles.filterButton, sortBy === 'recent' && styles.activeFilter]}
          >
            <Text style={styles.filterText}>🕒 Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSortBy('proximity')}
            style={[styles.filterButton, sortBy === 'proximity' && styles.activeFilter]}
          >
            <Text style={styles.filterText}>📍 Nearby</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Text style={styles.submitButtonText}>+ Submit New Report</Text>
        </TouchableOpacity>

        <FlatList
          data={sortedAlerts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <View style={styles.alertWrapper}>
              <View style={styles.alertCard}>
                <Text style={styles.title}>⚠️ {item.title}</Text>
                <Text style={styles.meta}>{item.location}</Text>
                <Text style={styles.distanceText}>~ {item.distance} km away</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <NavBar />
    </SafeAreaView>
  );
}
