import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49441f',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#2b2b2b',
    borderRadius: 6,
  },
  activeFilter: {
    backgroundColor: '#ffcc00',
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2b2b2b',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#ffcc00',
    fontWeight: '600',
    fontSize: 14,
  },
  listPadding: {
    paddingBottom: 16,
  },
  alertWrapper: {
    paddingHorizontal: 8,
  },
  alertCard: {
    backgroundColor: '#2b2b2b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffcc00',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  meta: {
    color: '#ddd',
    fontSize: 14,
  },
  distanceText: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 2,
  },
  timestamp: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 4,
  },
});