import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    fullName: 'Loading...',
    email: 'Loading...',
    username: 'Loading...',
    profilePic: require('../../assets/pictures/navbar/avatar.jpg'),
  });

  useFocusEffect(
    React.useCallback(() => {
      // Simulate fetching user data, or use route.params if passed
      if (route.params?.userData) {
        setUser(route.params.userData);
      } else {
        // Replace with real fetch if needed
        setUser({
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          username: 'johndoe',
          profilePic: require('../../assets/pictures/navbar/avatar.jpg'),
        });
      }
    }, [route.params])
  );

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

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        <Image source={user.profilePic} style={styles.avatar} />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 5,
  },
});
