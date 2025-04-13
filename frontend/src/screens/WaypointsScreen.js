import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WaypointsScreen = () => {
  const navigation = useNavigation();

  // Dummy data for waypoints
  const waypoints = [
    { id: '1', name: 'Waypoint 1', description: 'Description 1' },
    { id: '2', name: 'Waypoint 2', description: 'Description 2' },
    { id: '3', name: 'Waypoint 3', description: 'Description 3' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.waypointItem}>
      <Text style={styles.waypointName}>{item.name}</Text>
      <Text style={styles.waypointDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={() => alert('View waypoint')}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => alert('Delete waypoint')}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={waypoints}
        style={{ marginTop: 100 }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49441f',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  waypointItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  waypointName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  waypointDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#2b2b2b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WaypointsScreen;