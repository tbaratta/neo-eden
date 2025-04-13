import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  // Dummy data for the user profile
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    profilePic: require('../../assets/pictures/navbar/avatar.jpg'), 
  };

  return (
    <View style={{ ...styles.container, backgroundColor: '#49441f' }}>
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
      <View style={styles.infoContainer}>
        <Image source={user.profilePic} style={styles.profilePic} />
        <Text style={styles.fullName}>Full Name: {user.fullName}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <Text style={styles.username}>Username: {user.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
  },
});

export default ProfileScreen;