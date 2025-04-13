import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/pictures/navbar/7.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Image source={require('../../assets/pictures/navbar/6.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton}onPress={() => navigation.navigate('Chat')}>
        <Image source={require('../../assets/pictures/navbar/4.png')} style={styles.centerIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Image source={require('../../assets/pictures/navbar/3.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Image source={require('../../assets/pictures/navbar/2.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4A4522',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  centerButton: {
    backgroundColor: '#4A4522',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  centerIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
});
